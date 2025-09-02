import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'
import formData from 'form-data'
import fs from 'fs'
import bcrypt from 'bcrypt'

export const sendWelcomeListMessage = async () => {
    const res = await axios.post(
        'https://graph.facebook.com/v22.0/758418894023527/messages',
        {
            messaging_product: "whatsapp",
            to: "2348104259226",
            type: "interactive",
            interactive: {
                "type": "list",
                "body": {
                    "text": "“Hi 👋 I’m Tony's Whatsapp Assistant Bolt. How can I help today?”"
                },
                "footer": {
                    "text": "Tap the option below to select a response."
                },
                "action": {
                    "button": "OPTIONS",
                    "sections": [
                        {
                            "title": "info",
                            "rows": [
                                {
                                    "id": "INIT-#1",
                                    "title": "Account Info",
                                }
                            ]
                        },
                        {
                            "title": "orders",
                            "rows": [
                                {
                                    "id": "INIT-#2",
                                    "title": "Place Order",
                                }
                            ]
                        },
                        {
                            "title": "location",
                            "rows": [
                                {
                                    "id": "INIT-#3",
                                    "title": "Share Location",
                                }
                            ]
                        },
                        {
                            "title": "orders",
                            "rows": [
                                {
                                    "id": "INIT-#4",
                                    "title": "Track Orders",
                                }
                            ]
                        },
                        {
                            "title": "questions",
                            "rows": [
                                {
                                    "id": "INIT-#5",
                                    "title": "FAQs",
                                }
                            ]
                        },
                        {
                            "title": "support",
                            "rows": [
                                {
                                    "id": "INIT-#6",
                                    "title": "Contact Support",
                                }
                            ]
                        },
                        {
                            "title": "Survey",
                            "rows": [
                                {
                                    "id": "INIT-#7",
                                    "title": "Quick Survey",
                                }
                            ]
                        },
                    ]
                }
            }
        },
        {
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json'
            },
        }
    )
    console.log(res.data)
}

export const sendAccountInfo = async () => {
    const res = await axios.post(
        'https://graph.facebook.com/v22.0/758418894023527/messages',
        {
            messaging_product: "whatsapp",
            to: "2348104259226",
            type: "interactive",
            "interactive": {
                "type": "button",
                "header": {
                    "type": "text",
                    "text": "Below is your account information"
                },
                "body": {
                    "text": "Name: Anthony Odoh,\nnumber: 1234567890,\nemail: anthony@gmail.com,\nBalance: ₦12,450"
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "INFO-#1",
                                "title": "Back to Menu"
                            }
                        },
                    ]
                }
            },
        },
        {
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json'
            },
        }
    )
    console.log(res.data)
}
