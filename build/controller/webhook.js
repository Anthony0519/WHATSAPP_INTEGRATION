"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhook = exports.verifyWebhook = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const VERIFY_TOKEN = process.env.WHATSAPP_TOKEN;
const verifyWebhook = async (req, res) => {
    try {
        const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            return res.status(200).json({
                message: 'verification successfull',
                data: challenge
            });
        }
        res.status(400).json({
            message: "An error occoured"
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
};
exports.verifyWebhook = verifyWebhook;
const webhook = async (req, res) => {
    try {
        const body = req.body;
        console.log('Webhook event:', JSON.stringify(body, null, 2));
        // handle incoming messages
        const changes = body.entry?.[0]?.changes;
        if (!changes)
            return;
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
                }
            }
        }
    }
    catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        });
    }
};
exports.webhook = webhook;
