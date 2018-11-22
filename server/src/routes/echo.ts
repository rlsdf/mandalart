import { Router } from 'express'
import * as echo from '../controllers/echo'

const router = Router()

router.get('/echo', echo.echo)

export default router
