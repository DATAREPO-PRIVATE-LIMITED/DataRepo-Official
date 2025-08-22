import { Router } from 'express'
import authenticate from "../middlewares/authenticate.middleware.js"
import { login, logout, refreshAccessToken, register, getCurrentUser } from '../controllers/user.controllers.js'

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/refresh-token", refreshAccessToken)

router.get("/me", authenticate, getCurrentUser)
router.post("/logout", authenticate, logout)








export default router



