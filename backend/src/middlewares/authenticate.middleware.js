

import ErrorHandler from "../utils/ErrorHandler.js"
import { User } from "../models/user.models.js"
import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js"

const authenticate = asyncHandler(async (req, res, next) => {

    try {
        let token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ErrorHandler(" token not found", 400)
        }
        let decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)


        if (!decodedToken) {
            throw new ErrorHandler("user not authenticated , please login again", 400)
        }

        let myUser = await User.findById(decodedToken._id).select("-password -refreshToken ")

        if (!myUser) {
            throw new ErrorHandler("user not found ", 404)
        }


        req.myUser = myUser
        next()
    } catch (error) {
        throw new ErrorHandler("user not authenticated , token not found", 401)
    }

})


export default authenticate

