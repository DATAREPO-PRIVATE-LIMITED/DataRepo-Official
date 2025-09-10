import express from "express";
import {
    getAllUsers,
    getUserById,
    createUserAdmin,
    updateUserAdmin,
    updateUserStatusAdmin,
    deleteUserAdmin,
    getDashboardStats,
    getServicesStatus,
    getBillingData,
    getAnalyticsData,
    addApi,
    getEnquiryData,

} from "../controllers/admin.controllers.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

// Apply authentication and authorization middleware to all admin routes
router.use(authenticate);
router.use(authorize);

// Dashboard and Statistics
router.get("/dashboard/stats", getDashboardStats);
router.get("/analytics", getAnalyticsData);

// User Management
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.post("/users", createUserAdmin);
router.put("/users/:userId", updateUserAdmin);
router.patch("/users/:userId/status", updateUserStatusAdmin);
router.delete("/users/:userId", deleteUserAdmin);

// add api
router.post("/add-api", addApi)

// get enquiry data

router.get("/get-enquires", getEnquiryData)




// Services Monitoring
router.get("/services/status", getServicesStatus);

// Billing Management
router.get("/billing", getBillingData);

export default router;
