import express from "express"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
import { validation } from "../../middleware/validation.js"
import { addToCartVal, pramsIdVal, updateQTYVal } from "./cart.validation.js"
import { addToCart, applyCoupon, clearUserCart, getLoggedInUserCart, removeItemFromCart, updateQuantity } from "./cart.controller.js"
const cartRouter= express.Router()
cartRouter.route("/")
    .post(protectedRoutes,allowedTo("user"),validation(addToCartVal),addToCart)
    .get(protectedRoutes,allowedTo("user"),getLoggedInUserCart)
    .delete(protectedRoutes,allowedTo("user"),clearUserCart)
cartRouter.route("/:id")
    .delete(protectedRoutes,allowedTo("user"),validation(pramsIdVal),removeItemFromCart)
    .put(protectedRoutes,allowedTo("user"),validation(updateQTYVal),updateQuantity)
cartRouter.post("/applyCoupon",protectedRoutes,allowedTo("user"),applyCoupon)


export default cartRouter