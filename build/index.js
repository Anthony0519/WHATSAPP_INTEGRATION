"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
const sendTemplateMessage = async () => {
    const res = await axios_1.default.post('https://graph.facebook.com/v22.0/758418894023527/messages', {
        messaging_product: "whatsapp",
        to: "2348104259226",
        type: "template",
        template: {
            name: "hello_world",
            language: {
                code: "en_US"
            },
        }
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
    });
    console.log(res.data);
};
const sendTextMessage = async () => {
    const res = await axios_1.default.post('https://graph.facebook.com/v22.0/758418894023527/messages', {
        messaging_product: "whatsapp",
        to: "2348104259226",
        type: "text",
        text: {
            body: "Hello, this is a test message!"
        }
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
    });
    console.log(res.data);
};
const sendMediaMessage = async () => {
    const res = await axios_1.default.post('https://graph.facebook.com/v22.0/758418894023527/messages', {
        messaging_product: "whatsapp",
        to: "2348104259226",
        type: "image",
        image: {
            // link: "https://res.cloudinary.com/dfqlpxmqi/image/upload/v1751686939/portfolio/sag7cd3sfl2wohusmcqt.png",
            id: '1086005286981832',
            caption: "This is me testing whatsaap send media message api"
        }
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
    });
    console.log(res.data);
};
const uploadImage = async () => {
    const data = new form_data_1.default();
    data.append('messaging_product', 'whatsapp');
    data.append('file', fs_1.default.createReadStream(process.cwd() + '/image.jpg'), { contentType: 'image/jpeg' });
    data.append('type', 'image/jpeg');
    const res = await axios_1.default.post('https://graph.facebook.com/v22.0/758418894023527/media', data, {
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
        },
    });
    console.log(res.data);
};
// sendTemplateMessage()
// sendTextMessage()
sendMediaMessage();
// uploadImage()
