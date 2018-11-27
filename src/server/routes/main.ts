import { Router } from 'express'
import main from '../controllers/main'

const router = Router()

router.get('/', main)

export default router
