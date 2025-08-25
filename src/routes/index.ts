import express from 'express'
import { verifyWebhook, webhook } from '../controller/webhook'

const router = express.Router()

router.get('/webhook', verifyWebhook)
router.post('/webhook', webhook)

export default router