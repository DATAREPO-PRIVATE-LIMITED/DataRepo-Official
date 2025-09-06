
import ErrorHandler from "../utils/ErrorHandler.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import crypto from "crypto"
import { ApiKey } from "../models/apiKey.models.js"
import { User } from "../models/user.models.js"
import { Api } from "../models/api.models.js"


const generateApiKey = asyncHandler(async (req, res) => {

    const userId = req.myUser._id
    const apiId = req.params.apiId


    if (!(userId && apiId)) {
        throw new ErrorHandler("unable to find api id and user id", 404);
    }

    const key = crypto.randomBytes(32).toString("hex")

    const user = await User.findById(userId)


    if (!user) {
        throw new ErrorHandler("login again ", 401)
    }

    const apiName = await Api.findById(apiId)

    if (!apiName) {
        throw new ErrorHandler("api not found , try again ! ", 401)
    }

    const newApiKey = await ApiKey.create({
        userId: userId,
        serviceApi: apiId,
        apiName: apiName.name,
        apiKey: key
    })

    if (!newApiKey) {
        throw new ErrorHandler("unable to generate api key", 500)
    }

    user.services.push(newApiKey)
    await user.save()

    res.status(201).json(
        new ApiResponse("apiKey generated successfully ", newApiKey, 201)
    )
})

const getApiKey = asyncHandler(async (req, res) => {

    const userId = req.myUser._id
    const apiId = req.params.apiId

    const user = await User.findOne(userId)


    if (!user) {
        throw new ErrorHandler("user not authorised , please login again !", 401)
    }

   const service = user.services.find(
  (ele) => String(ele.serviceApi._id) === String(apiId)
);
    
if (!service) {
  throw new ErrorHandler("No API key found, please generate first", 404);
}

const key = service.apiKey; // or service.serviceApi.apiKey if the key is nested


    res.status(200).json(
        new ApiResponse("apikey fetched successfully", key, 200)
    )
})

const getAllServices = asyncHandler(async (req, res) => {


    const { _id } = req.myUser

    const user = await User.findById(_id)
    if (!user) {
        throw new ErrorHandler("user not authorised , please login again", 401)
    }


    res.status(200).json(
        new ApiResponse("all services fetched successfully", user.services, 200)
    )
})


const healthCheck = asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse("api fetched succesfully ", req.userId, 200)
    )
})


export { generateApiKey, healthCheck, getApiKey, getAllServices }