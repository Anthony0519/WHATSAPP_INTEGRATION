import { RequestHandler } from 'express'
import { tryReserveKey } from '../helpers/duplicateWebhook'
import dotenv from 'dotenv'
dotenv.config()
import {
  sendWelcomeListMessage,
  sendAccountInfo,
  sendProductListMessage,
  sendLocationRequest,
  sendOrderComfirmation,
  sendTextMessage,
  sendFAQ_List,
  sendSurveyMessage,
  sendUnhandledMessageRes
} from '../services/messages';
import { setContext, getContext, clearContext } from '../helpers/context';

const VERIFY_TOKEN = process.env.WHATSAPP_TOKEN

export const verifyWebhook: RequestHandler = async (req, res) => {
  try {

    const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK VERIFIED');
      res.status(200).send(challenge)
      return;
    }

    res.status(400)

  } catch (error: any) {
    res.status(500).json({
      message: `Server Error: ${error.message}`
    })
  }
}

export const webhook: RequestHandler = (req, res) => {
  try {
    const body = req.body;

    // Acknowledge quickly so WhatsApp won't retry
    res.sendStatus(200);

    if (!body) {
      console.log('Webhook received empty body — skipping processing.');
      return;
    }

    // console.log('Webhook event:', JSON.stringify(body, null, 2));
    console.log('Webhook event Received');

    const entries = Array.isArray(body.entry) ? body.entry : [body.entry].filter(Boolean);

    for (const entry of entries) {
      const changes = Array.isArray(entry?.changes) ? entry.changes : [entry?.changes].filter(Boolean);
      for (const change of changes) {
        const value = change?.value ?? {};

        // ---------- handle statuses ----------
        const statuses = Array.isArray(value?.statuses) ? value.statuses : undefined;
        if (statuses) {
          for (const st of statuses) {
            const msgId = st?.id ?? 'no-id';
            const status = st?.status ?? 'unknown';
            const ts = Number(st?.timestamp ?? Date.now());
            const key = `wh:status:${msgId}:${status}:${ts}`;

            if (!tryReserveKey(key, 60)) {
              console.log('Duplicate status event, skipping:', key);
              continue;
            }

            console.log(`Status received: id=${msgId} status=${status} ts=${ts}`);
          }
        }

        // ---------- handle messages (incoming messages, interactive replies) ----------
        const messages = Array.isArray(value?.messages) ? value.messages : undefined;
        if (!messages) continue;

        for (const message of messages) {
          const messageId = message?.id ?? message?.message_id ?? 'no-id';
          const msgType = message?.type ?? 'unknown';
          const key = `wh:msg:${messageId}:${msgType}`;

          if (!tryReserveKey(key, 60)) {
            console.log('Duplicate message event, skipping:', key);
            continue;
          }

          console.log('Processing incoming message:', messageId, 'type:', msgType);

          // -------- interactive messages (buttons / lists) --------
          if (msgType === 'interactive') {
            const interactive = message.interactive;
            if (!interactive) {
              console.log('Interactive payload missing interactive object');
              continue;
            }

            // Extract a single actionId whether it's button or list
            let actionId: string | undefined;
            let actionTitle: string | undefined;
            if (interactive.type === 'button_reply') {
              actionId = interactive.button_reply?.id;
              actionTitle = interactive.button_reply?.title;
            } else if (interactive.type === 'list_reply') {
              actionId = interactive.list_reply?.id;
              actionTitle = interactive.list_reply?.title;
            }

            if (!actionId) {
              console.log('Interactive received but no action id', interactive);
              continue;
            }

            console.log('Interactive action:', interactive.type, actionId, actionTitle);

            // Single switch mapping for all interactive actions
            switch (actionId) {
              case 'INIT-#1':
                void sendAccountInfo();
                break;
              case 'INIT-#2':
                void sendProductListMessage();
                break;
              case 'INIT-#4':
                void sendTextMessage('Please enter your Order ID to track (e.g., ORD-123).');
                break;
              case 'INIT-#5':
                void sendFAQ_List();
                break;
              case 'INIT-#6':
                void sendTextMessage('An agent will contact you soon. Please describe your issue and include order id if any.');
                break;
              case 'INIT-#7':
                void sendSurveyMessage();
                break;

              // Account submenu
              case 'INFO-#1':
                void sendWelcomeListMessage();
                break;

              // Order confirmation
              case 'CO-#1':
                void (async () => {
                  try {
                    await sendTextMessage('✅ Order confirmed. We will process and notify you with tracking info.');
                    await sendLocationRequest('Please share your location for delivery.')
                  } catch (e) {
                    console.error('Error sending confirmation text', e);
                  }
                })();
                break;
              case 'CO-#2':
                void sendTextMessage('Order cancelled. If you need anything else tap Back to Menu.');
                break;

              // Survey
              case 'SUR-#1':
                void sendTextMessage('Thanks for the feedback! 😊 Would you like to leave a short comment?');
                break;
              case 'SUR-#2':
                void sendTextMessage('Thanks — we appreciate your feedback.');
                break;
              case 'SUR-#3':
                void sendTextMessage('Sorry to hear that. Please tell us what went wrong or tap Contact Support.');
                break;

              // Product selections (from your product list)
              case 'PP-#1':
                setContext(String(messageId), 'quantity', { productId: 'PP-#1', label: 'Red T-Shirt', price: 4500 }, 120);
                void sendTextMessage('You selected *Red T-Shirt* — ₦4,500.\ntap Confirm to proceed to delivery.');
                void sendOrderComfirmation();
                break;
              case 'PP-#2':
                setContext(String(messageId), 'quantity', { productId: 'PP-#1', label: 'Blue jeans', price: 7200 }, 120);
                void sendTextMessage('You selected *Blue Jeans* — ₦7,200.\ntap Confirm to proceed to delivery.');
                void sendOrderComfirmation();
                break;
              case 'PP-#3':
                setContext(String(messageId), 'quantity', { productId: 'PP-#1', label: 'Sneakers', price: 15000 }, 120);
                void sendTextMessage('You selected *Sneakers* — ₦15,000.\ntap Confirm to proceed to delivery.');
                void sendOrderComfirmation();
                break;

              // FAQs items
              case 'faq-#1':
                void sendTextMessage('Opening hours: Mon-Sat 8am-6pm.');
                break;
              case 'faq-#2':
                void sendTextMessage('Refunds: Items returned within 7 days are eligible for refund. See our policy.');
                break;
              case 'faq-#3':
                void sendTextMessage('Return Policy: Items must be unused and in original packaging.');
                break;
              case 'faq-#4':
                void sendTextMessage('Connecting you to an agent now. Please wait...');
                break;

              default:
                console.log('Unhandled interactive action id:', actionId);
                void sendUnhandledMessageRes();
            }

            continue;
          }

          // ---------- Text messages ----------
          if (msgType === 'text') {
            const text = (message as any)?.text?.body ?? (message as any)?.text ?? '';
            const trimmed = String(text).trim();
            const lower = trimmed.toLowerCase();
            console.log('Text message body:', trimmed);

            const waId = message?.from ?? message?.sender?.id ?? message?.wa_id;
            const ctx = waId ? getContext(String(waId)) : null;

            // If user is expected to send quantity, handle numeric input as quantity
            // if (ctx?.expecting === 'quantity') {
            //   // Accept only reasonable quantity values
            //   if (/^\d+$/.test(trimmed)) {
            //     const qty = parseInt(trimmed, 10);
            //     if (qty > 0 && qty <= 100) {
            //       // process the order: you have ctx.data.productId, etc.
            //       const product = ctx.data;
            //       clearContext(String(waId));
            //       void sendTextMessage(`Quantity set to ${qty} for ${product.label}. Tap Confirm to place order.`);
            //       void sendOrderComfirmation();
            //     } else {
            //       void sendTextMessage('Please enter a valid quantity (1-100).');
            //     }
            //   } else {
            //     // Not a numeric reply while quantity expected — remind the user
            //     void sendTextMessage('Please reply with a numeric quantity (e.g., "2"), or tap Cancel to go back.');
            //   }
            //   continue;
            // }

            const isGreeting = /^(hi|hello|hey)\b/i.test(trimmed);
            const isRestart = /^\s*(restart|start)\b/i.test(trimmed);
            const isOrderId = /^ORD-?/i.test(trimmed);
            const mentionsTrack = /\b(track|where is my order)\b/i.test(lower);

            switch (true) {
              case isGreeting:
                void sendWelcomeListMessage();
                break;
              case isRestart:
                clearContext(String(waId));
                void sendWelcomeListMessage();
                break;
              case isOrderId:
                void sendTextMessage(`Tracking for ${trimmed}: Out for delivery — ETA 30 mins.`);
                break;
              case mentionsTrack:
                void sendTextMessage('Sure — please enter your Order ID (e.g., ORD-123).');
                break;
              default:
                void sendUnhandledMessageRes();
                break;
            }

            continue;
          }

          // ---------- Location messages ----------
          if (msgType === 'location') {
            const lat = message.location?.latitude;
            const long = message.location?.longitude;
            console.log(`Location received: lat=${lat} long=${long}`);
            void sendTextMessage(`Location received 📍 (${lat}, ${long}).\nWe will use this for delivery.`);
            continue;
          }

          // ---------- Other unhandled message types ----------
          console.log('Other message type received:', msgType, message);
          void sendUnhandledMessageRes();
        };
      };
    };
  } catch (err) {
    console.error('Webhook processing error:', err);
  }
};