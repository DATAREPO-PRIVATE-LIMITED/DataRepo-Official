import { User } from "../models/user.models.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import { Api } from "../models/api.models.js"

const addApi = asyncHandler(async (req, res) => {

    let { name, category, description, baseUrl, version, priceModel, rateLimit, tags, docsUrl } = req.body


    const api = await Api.create({
        name,
        category,
        description,
        baseUrl,
        version,
        priceModel,
        rateLimit,
        tags,
        docsUrl
    })

    if (!api) {
        throw new ErrorHandler("unable to publish api", 400)
    }

    res.status(201).json(
        new ApiResponse("Api publish successfully", api, 200)
    )
})

// Get all users with pagination and filtering
const getAllUsers = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, search = "", status = "", role = "" } = req.query;

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
        ];
    }
    if (status) filter.status = status;
    if (role) filter.role = role;

    const users = await User.find(filter)
        .select('-password -refreshToken')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json(
        new ApiResponse("Users fetched successfully", {
            users,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalUsers,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        }, 200)
    );
});

// Get user by ID with detailed information
const getUserById = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password -refreshToken');

    if (!user) {
        throw new ErrorHandler("User not found", 404);
    }

    // Mock API usage data for the user
    const userStats = {
        totalApiCalls: Math.floor(Math.random() * 50000) + 1000,
        monthlyApiCalls: Math.floor(Math.random() * 5000) + 100,
        totalBilling: Math.floor(Math.random() * 500) + 10,
        activeServices: Math.floor(Math.random() * 5) + 1,
        lastApiCall: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        averageResponseTime: Math.floor(Math.random() * 500) + 100
    };

    res.status(200).json(
        new ApiResponse("User details fetched successfully", {
            user,
            stats: userStats
        }, 200)
    );
});


// Get dashboard statistics
const getDashboardStats = asyncHandler(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const newUsersThisMonth = await User.countDocuments({
        createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });

    // Mock revenue and API usage data
    const stats = {
        users: {
            total: totalUsers,
            active: activeUsers,
            admins: adminUsers,
            newThisMonth: newUsersThisMonth,
            growthRate: 12.5
        },
        revenue: {
            total: 45678.90,
            monthly: 12345.67,
            growthRate: 8.2,
            averagePerUser: 36.50
        },
        apiUsage: {
            totalCalls: 1250000,
            monthlyCalls: 450000,
            growthRate: 15.3,
            averageResponseTime: 245
        },
        system: {
            uptime: 99.8,
            activeServices: 8,
            pendingIssues: 3,
            systemHealth: 99.8
        }
    };

    res.status(200).json(
        new ApiResponse("Dashboard statistics fetched successfully", stats, 200)
    );
});

// Get live services monitoring data
const getServicesStatus = asyncHandler(async (req, res) => {
    // Mock services data - in real implementation, this would come from actual service monitoring
    const services = [
        {
            id: 1,
            name: 'Data API',
            status: 'healthy',
            uptime: 99.9,
            responseTime: 120,
            requests: 450000,
            errors: 0.1,
            lastChecked: new Date()
        },
        {
            id: 2,
            name: 'Analytics API',
            status: 'healthy',
            uptime: 99.8,
            responseTime: 200,
            requests: 320000,
            errors: 0.2,
            lastChecked: new Date()
        },
        {
            id: 3,
            name: 'ML API',
            status: 'warning',
            uptime: 98.5,
            responseTime: 500,
            requests: 180000,
            errors: 1.5,
            lastChecked: new Date()
        },
        {
            id: 4,
            name: 'Authentication Service',
            status: 'healthy',
            uptime: 99.95,
            responseTime: 80,
            requests: 890000,
            errors: 0.05,
            lastChecked: new Date()
        }
    ];

    res.status(200).json(
        new ApiResponse("Services status fetched successfully", services, 200)
    );
});

// Get billing and revenue data
const getBillingData = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, status = "" } = req.query;

    const skip = (page - 1) * limit;

    // Mock billing data - in real implementation, this would come from actual billing system
    const mockBillingData = [
        {
            id: 1,
            userId: 'user1',
            userName: 'John Doe',
            email: 'john@example.com',
            amount: 50.00,
            status: 'paid',
            date: '2024-02-01',
            description: 'API Usage - January 2024',
            apiCalls: 5000,
            services: ['Data API', 'Analytics API']
        },
        {
            id: 2,
            userId: 'user2',
            userName: 'Jane Smith',
            email: 'jane@example.com',
            amount: 32.00,
            status: 'paid',
            date: '2024-02-01',
            description: 'API Usage - January 2024',
            apiCalls: 3200,
            services: ['Data API']
        },
        {
            id: 3,
            userId: 'user3',
            userName: 'Bob Johnson',
            email: 'bob@example.com',
            amount: 150.00,
            status: 'pending',
            date: '2024-02-01',
            description: 'API Usage - January 2024',
            apiCalls: 15000,
            services: ['Data API', 'Analytics API', 'ML API']
        }
    ];

    let filteredData = mockBillingData;
    if (status) {
        filteredData = mockBillingData.filter(item => item.status === status);
    }

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const paginatedData = filteredData.slice(skip, skip + parseInt(limit));

    res.status(200).json(
        new ApiResponse("Billing data fetched successfully", {
            billingData: paginatedData,
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalItems,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        }, 200)
    );
});

// Get analytics data
const getAnalyticsData = asyncHandler(async (req, res) => {
    const { period = 'month' } = req.query;

    // Mock analytics data - in real implementation, this would come from actual analytics system
    const analytics = {
        apiUsage: {
            totalCalls: 1250000,
            monthlyCalls: 450000,
            dailyCalls: 15000,
            averageResponseTime: 245,
            successRate: 99.2,
            peakUsage: 2500
        },
        revenue: {
            total: 45678.90,
            monthly: 12345.67,
            daily: 411.52,
            growthRate: 8.2,
            averagePerUser: 36.50,
            topRevenueUsers: [
                { userId: 'user1', name: 'John Doe', revenue: 500.00 },
                { userId: 'user2', name: 'Jane Smith', revenue: 320.00 },
                { userId: 'user3', name: 'Bob Johnson', revenue: 150.00 }
            ]
        },
        system: {
            cpuUsage: 99.8,
            memoryUsage: 67,
            storageUsage: 45,
            networkTraffic: 2.1,
            uptime: 99.8,
            activeConnections: 1250
        },
        userActivity: {
            activeUsers: 892,
            newUsers: 45,
            returningUsers: 847,
            averageSessionDuration: 25,
            mostActiveHours: [10, 14, 16, 20]
        }
    };

    res.status(200).json(
        new ApiResponse("Analytics data fetched successfully", analytics, 200)
    );
});


export {
    getAllUsers,
    getUserById,
    getDashboardStats,
    getServicesStatus,
    getBillingData,
    getAnalyticsData,
    addApi

};
