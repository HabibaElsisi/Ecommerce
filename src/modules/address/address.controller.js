import { userModel } from "../../../Database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";

const addAddress=catchError(async(req,res,next)=>{

    let address= await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{addresses:req.body}},{new:true})
    if(!address)return next(new AppError(`this user not found`,404))
    res.json({message:"address added successfully",address:address.addresses})

})

const deleteAddress=catchError(async(req,res,next)=>{
    let address= await userModel.findByIdAndUpdate(req.user._id,{$pull:{addresses:{_id:req.params.id}}},{new:true})
    if(!address)return next(new AppError(`this address not found`,404))
    res.json({message:"address deleted successfully",address:address.addresses})

}
)

const getLoggedUserAddress=async(req,res,next)=>{
    let address=await userModel.findById(req.user._id)
    if(!address) return next(new AppError(`this user not found`,404))
    if(address.addresses.length==0)return next(new AppError(`there is no addresses`))
    res.json({message:"this is all address ",address:address.addresses})
}

export{
    addAddress,
    deleteAddress,
    getLoggedUserAddress
}