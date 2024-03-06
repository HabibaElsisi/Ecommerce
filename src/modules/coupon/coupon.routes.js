import express from "express"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
import { validation } from "../../middleware/validation.js"
import { addCouponVal, paramsIdVal, updateCouponVal } from "./coupon.validation.js"
import { addCoupon, deleteCoupon, getAllCoupones, getSingleCoupon, updateCoupon } from "./coupon.controller.js"
const couponRouter=express.Router()
couponRouter.use(protectedRoutes,allowedTo("admin"))

couponRouter.route("/")
    .post(validation(addCouponVal),addCoupon)
    .get(getAllCoupones)
couponRouter.route("/:id")
    .get(validation(paramsIdVal),getSingleCoupon)
    .delete(validation(paramsIdVal),deleteCoupon)
    .put(validation(updateCouponVal),updateCoupon)




export default couponRouter