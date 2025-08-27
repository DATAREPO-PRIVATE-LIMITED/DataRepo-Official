import { Router } from 'express'
import authenticate from "../middlewares/authenticate.middleware.js"
import { login, logout, refreshAccessToken, register, getCurrentUser, addEquiry, getAllApi, updateProfileDetails, changePassword } from '../controllers/user.controllers.js'
import { get } from 'mongoose'

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/refresh-token", refreshAccessToken)
router.post("/contact", addEquiry)
router.get("/getAllApi", getAllApi)


router.get("/me", authenticate, getCurrentUser)
router.post("/logout", authenticate, logout)
router.patch("/update-profile", authenticate, updateProfileDetails)
router.patch("/change-password", authenticate, changePassword)








export default router



