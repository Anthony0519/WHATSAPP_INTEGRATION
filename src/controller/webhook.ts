import { Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()

const VERIFY_TOKEN = process.env.WHATSAPP_TOKEN

export const verifyWebhook: RequestHandler = async (req, res) => {
    try {

        const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query

        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
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

export const webhook: RequestHandler = async (req, res) => {
    try {

        const body = req.body;
    console.log('Webhook event:', JSON.stringify(body, null, 2));
    // handle incoming messages
    const changes = body.entry?.[0]?.changes;
    if (!changes) return;

    const value = changes[0].value;
    const messages = value.messages;
    if (messages && messages.length > 0) {
      const message = messages[0];
      // get interactive button reply
      if (message.type === 'interactive') {
        const interactive = message.interactive;
        if (interactive.type === 'button_reply') {
          const btn = interactive.button_reply;
          // btn.id and btn.title available
          console.log('User clicked button:', btn.id, btn.title);
        } else if (interactive.type === 'list_reply') {
          const list = interactive.list_reply;
          console.log('User selected list item:', list.id, list.title);
        }
      } else if (message.type === 'text') {
        // text message payload can be message.text.body or message.text (depends)
        const text = (message as any).text?.body ?? (message as any).text;
        console.log('Text body:', text);
      } else {
        console.log('Unhandled message type:', message.type);
      }
    }
        
    } catch (error: any) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }
}