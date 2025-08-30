import { RequestHandler } from 'express'
import { tryReserveKey } from '../helpers/duplicateWebhook'
import dotenv from 'dotenv'
dotenv.config()

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

    res.sendStatus(200);

    if (!body) {
      console.log('Webhook received empty body — skipping processing.');
      return;
    }
    
    console.log('Webhook event:', JSON.stringify(body, null, 2));

    const entries = Array.isArray(body.entry) ? body.entry : [body.entry].filter(Boolean);

    for (const entry of entries) {
      const changes = Array.isArray(entry?.changes) ? entry.changes : [entry?.changes].filter(Boolean);
      for (const change of changes) {
        const value = change?.value ?? {};

        // ---------- handle statuses (delivery/read updates) ----------
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

            // process status: update in-memory/DB, emit event, etc.
            console.log(`Status received: id=${msgId} status=${status} ts=${ts}`);
            // TODO: add your business logic here (e.g., update message state)
          }
        }

        // ---------- handle messages (incoming messages, interactive replies) ----------
        const messages = Array.isArray(value?.messages) ? value.messages : undefined;
        if (messages) {
          for (const message of messages) {
            const messageId = message?.id ?? message?.message_id ?? 'no-id';
            const msgType = message?.type ?? 'unknown';
            const key = `wh:msg:${messageId}:${msgType}`;

            if (!tryReserveKey(key, 60)) {
              console.log('Duplicate message event, skipping:', key);
              continue;
            }

            console.log('Processing incoming message:', messageId, 'type:', msgType);

            // handle interactive replies
            if (msgType === 'interactive') {
              const interactive = message.interactive;
              if (interactive?.type === 'button_reply') {
                const btn = interactive.button_reply;
                console.log('Button reply:', btn?.id, btn?.title);
                // TODO: map btn.id to an action (e.g., start flow)
              } else if (interactive?.type === 'list_reply') {
                const list = interactive.list_reply;
                console.log('List reply:', list?.id, list?.title);
              } else {
                console.log('Unhandled interactive subtype:', interactive?.type);
              }
            } else if (msgType === 'text') {
              const text = (message as any)?.text?.body ?? (message as any)?.text;
              console.log('Text message body:', text);
              // TODO: respond or route to your bot logic
            } else {
              console.log('Other message type received:', msgType, message);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error('Webhook processing error:', err);
  }
};