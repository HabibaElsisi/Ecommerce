import express from "express";
import { createCashOrder, createCheckOutSession, getALOrders, getSpecificOrder } from "./order.controller.js";
import { protectedRoutes } from "../../middleware/protectedRoutes.js";
import { allowedTo } from "../../middleware/allowedTo.js";
import { validation } from "../../middleware/validation.js";
import { createCashOrderVal } from "./order.validation.js";

const orderRouter=express.Router()
orderRouter.route("/")
    .get(protectedRoutes,allowedTo("user"),getSpecificOrder)
orderRouter.route("/AllOrders")
    .get(protectedRoutes,allowedTo("admin"),getALOrders)
orderRouter.route("/:id")
    .post(protectedRoutes,allowedTo("user"),validation(createCashOrderVal),createCashOrder)
orderRouter.post("/checkOut/:id",protectedRoutes,allowedTo("user"),createCheckOutSession)



export default orderRouter