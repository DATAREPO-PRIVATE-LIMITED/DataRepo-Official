
import { Router } from 'express'
import { generateApiKey } from '../controllers/apiKey.controller.js'
import authenticate from '../middlewares/authenticate.middleware.js'



const router = Router()

router.post("/generate-api-keys/:apiId",authenticate, generateApiKey)


export default router