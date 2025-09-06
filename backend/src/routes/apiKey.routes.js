
import { Router } from 'express'
import { generateApiKey, getAllServices, getApiKey, healthCheck } from '../controllers/apiKey.controller.js'
import authenticate from '../middlewares/authenticate.middleware.js'
import authApiKey from "../middlewares/authApiKey.js"



const router = Router()

router.post("/generate-api-keys/:apiId",authenticate, generateApiKey)
router.get("/get-api-key/:apiId",authenticate, getApiKey)
router.get("/get-all-services",authenticate, getAllServices)
router.get("/health-check",authApiKey, healthCheck)



export default router

