import { productModel } from "../../../Database/models/product.model.js";
import { userModel } from "../../../Database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";

const addToWishlist=catchError(async(req,res,next)=>{
    let product=await productModel.findById(req.body.product)
    if(!product) return next(new AppError(`this product not found`,404))
    let wishlist=await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishlist:req.body.product}},{new:true}).populate("wishlist")
    if(!wishlist)return next(new AppError(`this user not found`,404))
    res.json({message:"product added successfully to wishlist",wishlist:wishlist.wishlist})
})


const removeFromWishlist=catchError(async(req,res,next)=>{
    let product=await productModel.findById(req.params.id)
    if(!product) return next(new AppError(`this product not found`,404))
    let wishlist=await userModel.findByIdAndUpdate(req.user._id,{$pull:{wishlist:req.params.id}},{new:true}).populate("wishlist")
    if(!wishlist)return next(new AppError(`this user not found`,404))
    res.json({message:"product removed successfully from wishlist",wishlist:wishlist.wishlist})
})


const getLoggedUserWishlist=async(req,res,next)=>{
    let wishlist=await userModel.findById(req.user._id).populate("wishlist")
    if(!wishlist) return next(new AppError(`wishlist not found`,404))
    res.json({message:"this is your wishlist",wishlist:wishlist.wishlist})

}

export {
    addToWishlist,
    removeFromWishlist,
    getLoggedUserWishlist
}