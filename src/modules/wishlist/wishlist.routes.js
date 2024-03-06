import express from "express"
import { validation } from "../../middleware/validation.js"
import { addToWishlistVal, paramsVal } from "./wishlist.validation.js"
import { addToWishlist, getLoggedUserWishlist, removeFromWishlist } from "./wishlist.controller.js"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"

let wishlistRouter=express.Router()


    
wishlistRouter.route("/")
    .patch(protectedRoutes,allowedTo("user"),validation(addToWishlistVal),addToWishlist)
    .get(protectedRoutes,allowedTo("user"),getLoggedUserWishlist)
wishlistRouter.route("/:id")
    .delete(protectedRoutes,allowedTo("admin","user"),validation(paramsVal),removeFromWishlist)

export default wishlistRouter