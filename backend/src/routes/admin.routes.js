import express from "express";
import {
    getAllUsers,
    getUserById,
    updateUserStatus,
    getDashboardStats,
    getServicesStatus,
    getBillingData,
    getAnalyticsData,
    createUser,
    deleteUser,
    updateUser
} from "../controllers/admin.controllers.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

// Apply authentication and authorization middleware to all admin routes
// router.use(authenticate);
// router.use(authorize);

// Dashboard and Statistics
router.get("/dashboard/stats", getDashboardStats);
router.get("/analytics", getAnalyticsData);

// User Management
router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.post("/users", createUser);
router.put("/users/:userId", updateUser);
router.patch("/users/:userId/status", updateUserStatus);
router.delete("/users/:userId", deleteUser);

// Services Monitoring
router.get("/services/status", getServicesStatus);

// Billing Management
router.get("/billing", getBillingData);

export default router;
