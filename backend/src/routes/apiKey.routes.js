
import { Router } from 'express'
import { generateApiKey, getApiKey, healthCheck } from '../controllers/apiKey.controller.js'
import authenticate from '../middlewares/authenticate.middleware.js'
import authApiKey from "../middlewares/authApiKey.js"



const router = Router()

router.post("/generate-api-keys/:apiId",authenticate, generateApiKey)
router.get("/get-api-key",authenticate, getApiKey)
router.get("/health-check",authApiKey, healthCheck)



export default router

