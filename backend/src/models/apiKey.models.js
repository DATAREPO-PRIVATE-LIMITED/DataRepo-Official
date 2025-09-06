
import mongoose from "mongoose";


const apiKeySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    apiKey: {
        type: String,
        unique: true,
        require: true
    },
    serviceApi: {
        type: mongoose.Types.ObjectId,
        ref: "Api"
    },
    apiName: { type: String },

    usageCount: { type: Number, default: 0 },
    usageLimit: { type: Number },

}, { timestamps: true })


export const ApiKey = mongoose.model("ApiKey", apiKeySchema)