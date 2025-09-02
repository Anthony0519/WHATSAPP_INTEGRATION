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
                    "text": "“Hi 👋 I'm Tony's Whatsapp Assistant Bolt. How can I help today?”"
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

export const sendProductListMessage = async () => {
    const res = await axios.post(
        'https://graph.facebook.com/v22.0/758418894023527/messages',
        {
            messaging_product: "whatsapp",
            to: "2348104259226",
            type: "interactive",
            interactive: {
                "type": "list",
                "body": {
                    "text": "“Choose a Product”"
                },
                "footer": {
                    "text": "Tap the option below to select a response."
                },
                "action": {
                    "button": "Available Product",
                    "sections": [
                        {
                            "title": "shirt",
                            "rows": [
                                {
                                    "id": "PP-#1",
                                    "title": "Red T-Shirt",
                                }
                            ]
                        },
                        {
                            "title": "trouser",
                            "rows": [
                                {
                                    "id": "PP-#2",
                                    "title": "Blue jeans",
                                }
                            ]
                        },
                        {
                            "title": "shoe",
                            "rows": [
                                {
                                    "id": "PP-#3",
                                    "title": "Sneakers",
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

export const sendLocationRequest = async (text: string) => {
    const res = await axios.post(
        'https://graph.facebook.com/v22.0/758418894023527/messages',
        {
            messaging_product: "whatsapp",
            to: "2348104259226",
            type: "interactive",
            "interactive": {
                "type": "location_request_message",
                "body": {
                    "text": text
                },
                "action": {
                    "name": "send_location"
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

export const sendOrderComfirmation = async () => {
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
                    "text": "Comfirm Your Order"
                },
                "body": {
                    "text": "Click COMFIRM so we can proceed to delivery or CANCEL to cancel the order"
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "CO-#1",
                                "title": "COMFIRM"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "CO-#2",
                                "title": "CANCEL"
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

export const sendTextMessage = async (text: string)=>{
    const res = await axios.post(
        'https://graph.facebook.com/v22.0/758418894023527/messages',
        {
            messaging_product: "whatsapp",
            to: "2348104259226",
            type: "text",
            text: {
                body: text
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

export const sendFAQ_List = async () => {
    const res = await axios.post(
        'https://graph.facebook.com/v22.0/758418894023527/messages',
        {
            messaging_product: "whatsapp",
            to: "2348104259226",
            type: "interactive",
            interactive: {
                "type": "list",
                "body": {
                    "text": "Here are some common FAQs"
                },
                "footer": {
                    "text": "Tap the button below to select a response."
                },
                "action": {
                    "button": "common FAQs",
                    "sections": [
                        {
                            "title": "open",
                            "rows": [
                                {
                                    "id": "faq-#1",
                                    "title": "Opening hours",
                                }
                            ]
                        },
                        {
                            "title": "refund",
                            "rows": [
                                {
                                    "id": "faq-#2",
                                    "title": "Refund",
                                }
                            ]
                        },
                        {
                            "title": "policy",
                            "rows": [
                                {
                                    "id": "faq-#3",
                                    "title": "Return Policy",
                                }
                            ]
                        },
                        {
                            "title": "talk",
                            "rows": [
                                {
                                    "id": "faq-#4",
                                    "title": "Talk to Agent",
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

export const sendSurveyMessage = async () => {
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
                    "text": "SURVEY"
                },
                "body": {
                    "text": "How was your experience?"
                },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "SUR-#1",
                                "title": "GOOD ✅"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "SUR-#2",
                                "title": "OKAY 👍"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "SUR-#3",
                                "title": "BAD 👎"
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

export const sendTemplateMessage = async ()=>{
const res = await axios.post(
    'https://graph.facebook.com/v22.0/758418894023527/messages',
    {
        messaging_product: "whatsapp",
        to: "2348104259226",
        type: "template",
        template: {
            name: "message_format",
            language: {
                code: "en_US"
            },
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
