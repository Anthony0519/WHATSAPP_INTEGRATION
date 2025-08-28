import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'
import formData from 'form-data'
import fs from 'fs'
import bcrypt from 'bcrypt'

// const sendTemplateMessage = async ()=>{
//     const res = await axios.post(
//         'https://graph.facebook.com/v22.0/758418894023527/messages',
//         {
//             messaging_product: "whatsapp",
//             to: "2348104259226",
//             type: "template",
//             template: {
//                 name: "hello_world",
//                 language: {
//                     code: "en_US"
//                 },
//             }
//         },
//         {
//             headers: {
//             'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
//             'Content-Type': 'application/json'
//             },
//         }
//     )
//     console.log(res.data)
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

// sendTemplateMessage()
// sendTextMessage()
// sendMediaMessage()
// uploadImage()


const hashPassword = async (password: string) => {
  const saltRounds = 12
  const hashedPassword = await bcrypt.hash(password, saltRounds)
   console.log(hashedPassword)
}

hashPassword('Anthony19')
