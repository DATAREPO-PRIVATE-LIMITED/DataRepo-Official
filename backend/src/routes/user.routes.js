import { Router } from 'express'
import authenticate from "../middlewares/authenticate.middleware.js"
import { login, logout, refreshAccessToken, register, getCurrentUser, addEquiry, getAllApi, updateProfileDetails, changePassword, getSingleApi, getUsageSummary, getRecentInvoices, getPaymentMethod, getUserAnalytics } from '../controllers/user.controllers.js'
import { createOrder, paymentAuth } from '../config/razorpay.js'


const router = Router()

router.post("/register", register)
router.post("/login", login)
router.post("/refresh-token", refreshAccessToken)
router.post("/contact", addEquiry)
router.get("/getAllApi", getAllApi)
router.get("/get-single-api/:apiId", getSingleApi)


router.get("/me", authenticate, getCurrentUser)
router.post("/logout", authenticate, logout)
router.patch("/update-profile", authenticate, updateProfileDetails)
router.patch("/change-password", authenticate, changePassword)


//payement authorize
router.post("/authorise-payment", authenticate, createOrder)
router.post("/save-payment-auth", authenticate, paymentAuth)

// usage, invoices, payment method
router.get("/usage-summary", authenticate, getUsageSummary)
router.get("/recent-invoices", authenticate, getRecentInvoices)
router.get("/payment-method", authenticate, getPaymentMethod)
router.get("/analytics", authenticate, getUserAnalytics)





export default router



