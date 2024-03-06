import express from "express"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
import { validation } from "../../middleware/validation.js"
import { addAddressVal, paramsIdVal } from "./address.validation.js"
import { addAddress, deleteAddress, getLoggedUserAddress } from "./address.controller.js"
const addressRouter=express.Router()
addressRouter.route("/")
    .patch(protectedRoutes,allowedTo("user"),validation(addAddressVal),addAddress)
    .get(protectedRoutes,allowedTo("user","admin"),getLoggedUserAddress)
addressRouter.route("/:id")
    .delete(protectedRoutes,allowedTo("user","admin"),validation(paramsIdVal),deleteAddress)



export default addressRouter