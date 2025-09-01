
import mongoose from 'mongoose'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "name is required"]
    },
    email: {
        type: String,
        require: [true, "email is required"],
        unique: true,
        index: 1
    },
    password: {
        type: String,
        require: [true, "password is required"],
        minlength: [8, "passowrd length must be greater than or equal to 8"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    status: {
        type: String,
        enum: ["active", "suspended"],
        default: "active"
    },
    refreshToken: {
        type: String
    },

    services: {
        type: [Object],
        default: []
    }
}, { timestamps: true , minimize:false})

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next()

    let salt = await bcrypt.genSalt(12)

    let hassPass = await bcrypt.hash(this.password, salt)


    this.password = hassPass


})

userSchema.methods.isPassCorrect = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password)

}

userSchema.methods.genAccessToken = async function () {
    return jwt.sign({
        _id: this._id
    },

        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        })

}


userSchema.methods.genRefreshToken = async function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        })
}


export const User = mongoose.model("User", userSchema)
