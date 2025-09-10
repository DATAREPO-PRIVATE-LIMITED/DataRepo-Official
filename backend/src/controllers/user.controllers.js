
import { User } from "../models/user.models.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"
import { Enquiry } from "../models/enquiry.models.js"
import { Api } from "../models/api.models.js"
import { ApiKey } from "../models/apiKey.models.js"
// Optional models; code guards if unavailable
let PaymentModel = null;
let BillingModel = null;
try { PaymentModel = (await import("../models/payment.models.js")).Payment } catch (e) {}
try { BillingModel = (await import("../models/billing.models.js")).Billing } catch (e) {}

const generateAccesTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.genAccessToken()
        const refreshToken = await user.genRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, newRefreshToken: refreshToken }
    } catch (error) {
        throw new ErrorHandler("Error while generating access and refresh token", 500)
    }
}


const register = asyncHandler(async (req, res) => {

    let { name, email, password, confirmPassword, role } = req.body

    if (password !== confirmPassword) {
        throw new ErrorHandler("password mismatch! ", 401)
    }

    let newUser = await User.findOne({ email })
    if (newUser) {
        throw new ErrorHandler("user already register , please login", 400)
    }

    const user = await User.create({
        name,
        email,
        password,
        role: role || "user"
    })


    if (!user) {
        throw new ErrorHandler("user not created ", 400)
    }


    res.status(201).json(
        new ApiResponse("user register succesfully ", user, 201)
    )
})

const login = asyncHandler(async (req, res) => {
    let { email, password } = req.body

    let user = await User.findOne({ email })
    if (!user) throw new ErrorHandler("please register first", 401)

    let passCheck = await user.isPassCorrect(password)

    if (!passCheck) {
        throw new ErrorHandler("incorrect credentials", 401)
    }

    const { accessToken, newRefreshToken } = await generateAccesTokenAndRefreshToken(user._id)

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }

    res.status(200)
        .cookie("refreshToken", newRefreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse("user login successfully", user, 200)
        )

})


const logout = asyncHandler(async (req, res) => {

    const user = await User.findById(req.myUser?._id);
    if (user) {
        user.refreshToken = null;
        await user.save({ validateBeforeSave: false });
    }

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None"

    };

    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .status(200)
        .json(new ApiResponse("User logout successfully", 200));

})

// update profile 

const updateProfileDetails = asyncHandler(async (req, res) => {

    let { name, email, } = req.body

    let { _id } = req.myUser;

    const user = await User.findOneAndUpdate({
        _id
    },
        {
            $set: {
                name: name,
                email: email,
            },

        },
        {
            new: true
        }
    )

    if (!user) {
        throw new ApiResponse("unauthorized acces , login again", 400)

    }

    res.status(200).json(
        new ApiResponse("user data updated successfully", user, 200)
    )



})

// forget password
const changePassword = asyncHandler(async (req, res) => {

    let { _id } = req.myUser;

    let { password, newPassword, confirmNewPassword } = req.body

    const user = await User.findById(_id)

    let validateCurrentPassword = await user.isPassCorrect(password)
    if (!validateCurrentPassword) {
        throw new ErrorHandler("invalid password", 404)
    }

    if (newPassword === confirmNewPassword) {
        user.password = newPassword
        await user.save({ validateBeforeSave: false })
    } else {
        throw new ErrorHandler("password mismatch", 404)
    }

res.status(200).json(
    new ApiResponse("password updated successfully", user, 200)
)

})

const refreshAccessToken = asyncHandler(async (req, res) => {

    let incomingRefrehToken = req.cookies?.refreshToken || req.body.refreshToken

    if (!incomingRefrehToken) {
        throw new ErrorHandler("unauthorized access", 401)
    }

    try {

        let decodedToken = jwt.verify(incomingRefrehToken, process.env.REFRESH_TOKEN_SECRET)

        let user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ErrorHandler("Invalid Token", 401)
        }

        if (incomingRefrehToken !== user.refreshToken) {
            throw new ErrorHandler("inavlid token or Token is Expired", 401)
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccesTokenAndRefreshToken(user._id)

        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    "Access Token is Refreshed",
                    { accessToken, newRefreshToken },
                    200


                )
            )

    } catch (error) {
        throw new ErrorHandler(error?.message, 401 || "Invalid refresh token")
    }
})

const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse("User fetched successfully", req.myUser, 200)
    )
})

// enqires
const addEquiry = asyncHandler(async (req, res) => {

    let { name, email, mobile, message } = req.body;

    let enquiryData = await Enquiry.create({
        name,
        email,
        mobile,
        message
    })

    res.status(201).json(
        new ApiResponse("message send to our team ", enquiryData, 2001)
    )


})

const getAllApi = asyncHandler(async (req, res) => {

    let apis = await Api.find()

    if (!apis) {
        throw new ErrorHandler("unable to fetch apis list", 404)
    }

    res.status(200).json(
        new ApiResponse("apis list fetched succesfully", apis, 200)
    )
})
const getSingleApi = asyncHandler(async (req, res) => {

let  apiID  = req.params.apiId

    let singleApi = await Api.findById(apiID)

    if (!singleApi) {
        throw new ErrorHandler("unable to fetch api", 404)
    }

    res.status(200).json(
        new ApiResponse("api fetched succesfully", singleApi, 200)
    )
})


export { register, login, refreshAccessToken, logout, getCurrentUser, addEquiry, getAllApi, updateProfileDetails , changePassword, getSingleApi}

// ====== Usage, Billing, and Payment (User) ======

// GET /users/usage-summary
export const getUsageSummary = asyncHandler(async (req, res) => {
    const userId = req.myUser?._id;

    // Total APIs user has (based on saved services)
    const user = await User.findById(userId);
    const totalApis = Array.isArray(user?.services) ? user.services.length : 0;

    // Aggregate API calls from ApiKey usageCount for this user
    const keys = await ApiKey.find({ userId });
    const totalApiCalls = keys.reduce((sum, k) => sum + (k.usageCount || 0), 0);

    // Rate per request (fallback constant until pricing per-API is implemented)
    const ratePerRequest = 0.01;
    const currentBill = Number((totalApiCalls * ratePerRequest).toFixed(2));

    return res.status(200).json(
        new ApiResponse("Usage summary fetched", {
            totalApis,
            totalApiCalls,
            currentBill,
            ratePerRequest
        }, 200)
    );
});

// GET /users/recent-invoices
export const getRecentInvoices = asyncHandler(async (req, res) => {
    const userId = req.myUser?._id;

    // Try real payments if model is available; otherwise return empty list
    let invoices = [];
    if (PaymentModel) {
        const payments = await PaymentModel.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();

        invoices = payments.map(p => ({
            id: p.razorpayPaymentId || String(p._id),
            date: p.createdAt,
            amount: typeof p.amount === 'number' ? p.amount / 100 : p.amount, // assume paise to INR
            status: p.status || 'authorized',
            description: 'API Usage Charge'
        }));
    }

    return res.status(200).json(
        new ApiResponse("Recent invoices fetched", { invoices }, 200)
    );
});

// GET /users/payment-method
export const getPaymentMethod = asyncHandler(async (req, res) => {
    const userId = req.myUser?._id;
    const user = await User.findById(userId).lean();

    const isAuthorized = !!user?.isPaymentAuthorized;
    const token = user?.paymentMethodToken || null;

    // We do not store card PAN; return masked token-based info only
    const card = token ? {
        brand: 'Razorpay',
        last4: String(token).slice(-4).padStart(4, '•'),
        expiry: null
    } : null;

    return res.status(200).json(
        new ApiResponse("Payment method fetched", {
            isAuthorized,
            card
        }, 200)
    );
});

// GET /users/analytics
export const getUserAnalytics = asyncHandler(async (req, res) => {
    const userId = req.myUser?._id;

    // Aggregate from keys
    const keys = await ApiKey.find({ userId }).lean();
    const totalCalls = keys.reduce((sum, k) => sum + (k.usageCount || 0), 0);

    const ratePerRequest = 0.01;
    const currentMonthBill = Number((totalCalls * ratePerRequest).toFixed(2));

    const analytics = {
        apiUsage: {
            totalCalls,
            monthlyCalls: totalCalls, // placeholder without time-series
            dailyCalls: Math.round(totalCalls / 30),
        },
        billing: {
            ratePerRequest,
            currentMonthBill
        }
    };

    return res.status(200).json(
        new ApiResponse("Analytics data fetched", analytics, 200)
    );
});


