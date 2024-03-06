import { couponModel } from "../../../Database/models/coupon.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFeature } from "../../utils/apiFeature.js";
import { deleteOne } from "../handlers/handle.js";

const addCoupon=catchError(async(req,res,next)=>{
    let isCouponExists=await couponModel.findOne({code:req.body.code})
    if(isCouponExists)return next(new AppError(`this coupon already exists`,404))
    let coupon= new couponModel(req.body)
    req.body.createdBy=req.user._id
    await coupon.save()
    res.json({message:"coupon added successfully",coupon})

})
const getAllCoupones=catchError(async(req,res,next)=>{
    let apiFeature= new ApiFeature(couponModel.find(),req.query).pagination().sort()
    .search().fields().filter()
    let coupons=await apiFeature.mongooseQuery
    res.json({message:"this is all coupons",page:apiFeature.pageNumber,coupons})


})

const getSingleCoupon=catchError(async(req,res,next)=>{
    let coupon=await couponModel.findById(req.params.id)
    if(!coupon) return next(new AppError(`this coupon not found`,404))
    res.json({message:"this is coupon",coupon})
}
)

const updateCoupon=catchError(async(req,res,next)=>{
    let coupon=await couponModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!coupon) return next(new AppError(`this coupon not found`,404))
    res.json({message:"coupon updated successfully",coupon})

})

const deleteCoupon=deleteOne(couponModel)
export {
    addCoupon,
    getAllCoupones,
    getSingleCoupon,
    updateCoupon,
    deleteCoupon
}