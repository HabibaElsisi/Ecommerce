
import { userModel } from "../../../Database/models/user.model.js"
import { catchError } from "../../middleware/catchError.js"
import { sendEmail } from "../../services/email/sendEmail.js"
import { AppError } from "../../utils/AppError.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const signUp=catchError(async(req,res,next)=>{
    let user=new userModel(req.body)
    await user.save()
    sendEmail(req.body.email)
    let token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    res.json({message:"signUp successfully",token})
})

const signin = catchError(async (req, res,next) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        if(!user.emailVerify){
             sendEmail(user.email)
            return  next(new AppError(`verify email first`,401))
             
            }
            let token = jwt.sign({ userId: user._id,role:user.role },process.env.JWT_KEY)
        return res.json({ message: "signIn Successfully", token })
    }

    return res.json({ message: "incorrect email or password " })
})

const verify = catchError(async (req, res) => {
    jwt.verify(req.params.token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) return res.json(err)
        await userModel.findOneAndUpdate({ email: decoded.email }, { emailVerify: true })
        res.json({ message: "success" })
    })

})


const changePassword=async(req,res,next)=>{

    let user=await userModel.findById(req.user._id)
    if(!user) return next(new AppError(`this user not fount`,404))
    if(!bcrypt.compareSync(req.body.oldPassword,user.password)) {
        return next(new AppError(`wrong password`))
    }
    let token=jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)

    await userModel.findByIdAndUpdate(req.user._id,{password:req.body.newPassword,passwordChangedAt:Date.now()},{new:true})
    res.json({message:"Password changed successfully",token})

}







export{
    signUp,
    verify,
    signin,
    changePassword
}