import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";


const authorize = asyncHandler( async ( req, res, next) => {

    let {_id} = req.myUser

    let user = await User.findById(_id)
    if(!user){
        throw new ErrorHandler("user not found", 404)
    }

    if(user.role !=="admin"){
throw new ErrorHandler(" unauthorized access ", 401)
    }

    next()
})


export default authorize

