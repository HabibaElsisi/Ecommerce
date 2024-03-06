import jwt from"jsonwebtoken"
import { catchError } from "./catchError.js"
import { AppError } from "../utils/AppError.js"
import { userModel } from "../../Database/models/user.model.js"
export const protectedRoutes=catchError(async(req,res,next)=>{
    if(!req.headers.token)return next(new AppError(`token not provided`,401))
    let decoded=jwt.verify(req.headers.token,process.env.JWT_KEY)
    let user =await userModel.findById(decoded.userId)
    if(!user) return next(new AppError(`user not found`,401))
    if(user.passwordChangedAt){
        let time=parseInt(user?.passwordChangedAt.getTime()/1000)
        if(time>decoded.iat)return next(new AppError(`expired token ....log in again`))
    }
   
    req.user=user
    next()


})