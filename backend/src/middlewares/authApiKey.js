
import { ApiKey } from "../models/apiKey.models.js"
import ErrorHandler from "../utils/ErrorHandler.js"

const authApiKey = async (req, res, next) => {

    let key = req.headers["x-api-key"]

    if (!key) {
        throw new ErrorHandler("please provide the Api key", 400)
    }

    try {
        const apiRecord = await ApiKey.findOne({ apiKey: key })

        if (!apiRecord) {
            throw new ErrorHandler("please provide the valid api key", 401)
        }

        if (apiRecord.usageLimit && apiRecord.usageLimit >= apiRecord.usageLimit) {
            throw new ErrorHandler("Api key usage limit exceeded", 400)
        }

        apiRecord.usageCount += 1;
        // Log right after incrementing
        console.log("Count :", apiRecord.usageCount);
        console.log("api :", apiRecord);

        await apiRecord.save();
        req.userId = apiRecord.userId;
        next();
    } catch (error) {
        console.log('error while verifying the api key', error)
    }

}


export default authApiKey