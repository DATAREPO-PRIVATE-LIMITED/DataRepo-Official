
import mongoose from "mongoose"

const enquirySchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "name is required"]
    },
    email:{
         type: String,
        required:[true, "email is required"]
    },
    mobile:{
         type: Number,
        required:[true, "mobile number is required"]
    },
    message:{
         type: String,
        required:[true, "message is required"]
    }


},{timestamps: true})


export const Enquiry = mongoose.model("Enquiry", enquirySchema)