import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'
import formData from 'form-data'
import fs from 'fs'
import bcrypt from 'bcrypt'

// const sendTemplateMessage = async ()=>{
// const res = await axios.post(
//     'https://graph.facebook.com/v22.0/758418894023527/messages',
//     {
//         messaging_product: "whatsapp",
//         to: "2348104259226",
//         type: "template",
//         template: {
//             name: "hello_world",
//             language: {
//                 code: "en_US"
//             },
//         }
//     },
//     {
//         headers: {
//         'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
//         'Content-Type': 'application/json'
//         },
//     }
// )
// console.log(res.data)
// }

// const sendTextMessage = async ()=>{
//     const res = await axios.post(
//         'https://graph.facebook.com/v22.0/758418894023527/messages',
//         {
//             messaging_product: "whatsapp",
//             to: "2348104259226",
//             type: "text",
//             text: {
//                 body: "Hello, this is a test message!"
//             }
//         },
//         {
//             headers: {
//                 'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
//                 'Content-Type': 'application/json'
//             },
//         }
//     )
//     console.log(res.data)
// }

// const sendMediaMessage = async () => {
//     const res = await axios.post(
//         'https://graph.facebook.com/v22.0/758418894023527/messages',
//         {
//             messaging_product: "whatsapp",
//             to: "2348104259226",
//             type: "image",
//             image: {
//                 // link: "https://res.cloudinary.com/dfqlpxmqi/image/upload/v1751686939/portfolio/sag7cd3sfl2wohusmcqt.png",
//                 id: '1086005286981832',
//                 caption: "This is me testing whatsaap send media message api"
//             }
//         },
//         {
//             headers: {
//                 'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
//                 'Content-Type': 'application/json'
//             },
//         }
//     )
//     console.log(res.data)
// }

// const uploadImage = async () => {
//     const data = new formData()
//     data.append('messaging_product', 'whatsapp')
//     data.append('file', fs.createReadStream(process.cwd() + '/image.jpg'), { contentType: 'image/jpeg' })
//     data.append('type', 'image/jpeg')
//     const res = await axios.post(
//         'https://graph.facebook.com/v22.0/758418894023527/media',
//         data,
//         {
//             headers: {
//                 'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
//             },
//         }
//     )
//     console.log(res.data)
// }

const sendInteractiveListMessage = async () => {
    const res = await axios.post(
        'https://graph.facebook.com/v22.0/758418894023527/messages',
        {
            messaging_product: "whatsapp",
            to: "2348104259226",
            type: "interactive",
            interactive: {
                "type": "list",
                "header": {
                    "type": "text",
                    "text": "Welcome to TONY-CODE"
                },
                "body": {
                    "text": "How may we be of help to you"
                },
                "footer": {
                    "text": "Click the option button below to select a response"
                },
                "action": {
                    "button": "OPTIONS",
                    "sections": [
                        {
                            "title": "Tony-codes",
                            "rows": [
                                {
                                    "id": "#TC-1",
                                    "title": "Customer Support",
                                    // "description": "This helps you with a friendly customer support",
                                }
                            ]
                        },
                        {
                            "title": "Tony-codes",
                            "rows": [
                                {
                                    "id": "#TC-2",
                                    "title": "enquiry",
                                    // "description": "This gives you more info about my services",
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

const sendInteractiveReplyButtonMessage = async () => {
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
                    "text": "What type of Transfer do you want?"
                },
                "body": {
                    "text": "Choose your option carefully"
                },
                // "footer": {
                //     "text": "your-text-footer-content"
                // },
                "action": {
                    "buttons": [
                        {
                            "type": "reply",
                            "reply": {
                                "id": "#TC-1",
                                "title": "In-app Transfer"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "#TC-2",
                                "title": "Bank Transfer"
                            }
                        },
                        {
                            "type": "reply",
                            "reply": {
                                "id": "#TC-2",
                                "title": "Bank Transfer"
                            }
                        }
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

const sendLocationRequestMessage = async () => {
    const res = await axios.post(
        'https://graph.facebook.com/v22.0/758418894023527/messages',
        {
            messaging_product: "whatsapp",
            to: "2348104259226",
            type: "interactive",
            "interactive": {
                "type": "location_request_message",
                "body": {
                    "text": "Your order will be delivered to you in a bit. You can share your address *manually* or *share your Location* so we could get to you easily"
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

// sendTemplateMessage()
// sendTextMessage()
// sendMediaMessage()
// uploadImage()
// sendInteractiveListMessage()
// sendInteractiveReplyButtonMessage()
sendLocationRequestMessage()


// const hashPassword = async (password: string) => {
//   const saltRounds = 12
//   const hashedPassword = await bcrypt.hash(password, saltRounds)
//    console.log(hashedPassword)
// }

// hashPassword('Anthony19')
