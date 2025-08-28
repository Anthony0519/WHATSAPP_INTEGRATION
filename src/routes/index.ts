import { Router } from 'express'
import { verifyWebhook, webhook } from '../controller/webhook'

const router = Router()

router.get('/webhook', verifyWebhook)
router.post('/webhook', webhook)

export default router