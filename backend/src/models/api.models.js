import mongoose from "mongoose"


const apiSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        enum: ["Data & Analytics",
            "Communication",
            "Payment & Finance",
            "Social Media",
            "Weather",
            "News & Content",
            "Transportation",
            "Healthcare",
            "Education",
            "Entertainment",
            "Other"],
        require: true,
    },

    description:{
        type:String,
        require:true
    },
    baseUrl:{
        type:String,
        require:true
    },
    version:{
        type:Number,
        
    },
    priceModel:{
type:String,
enum:["Free", "Pay Per Use"],
default:"Pay Per Use"
    },
    rateLimit:{
        type:Number,

    },
    tags:{
        type:[],
    
    },
    docsUrl:{
        type:String,
        require:true
    }
    

}, { timestamps: true })


export const Api = mongoose.model("Api", apiSchema)