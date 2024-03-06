import express from "express"
import { isEmailExists } from "../../middleware/EmailExists.js"
import { changePassword, signUp, signin, verify } from "./auth.controller.js"
import { validation } from "../../middleware/validation.js"
import { changePasswordVal, signUpVal, signinVal } from "./auth.validation.js"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
let authRouter=express.Router()
authRouter.post("/signUp",validation(signUpVal),isEmailExists,signUp)
authRouter.post("/signIn",validation(signinVal),signin)
authRouter.get('/verify/:token',verify)




export default authRouter