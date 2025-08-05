import HandleError from "../utils/handleError.js";
import handleAsyncError from "./handleAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"

export const verifyUserAuth=handleAsyncError(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return next(new HandleError("Authentication is missing!Please login to access resource",401))
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData.id);
    next();
    
})

export const roleBasedAccess=(...roles)=>{
return(req,res,next)=>{
    if(!roles.includes(req.user.role)){
   return next(new HandleError(`Role - ${req.user.role} is not allowed to access the resources`,403))
}
    next();
}

}
