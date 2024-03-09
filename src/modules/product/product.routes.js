import express from "express"
import { uploadFields } from "../../services/fileUploads/fileUploads.js"
import {addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct} from "./product.controller.js"
import { validation } from "../../middleware/validation.js"
import { addProductVal, paramsIdVal, updateProductVal } from "./product.validation.js"
import reviewRouter from "../review/review.routes.js"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"

const productRouter=express.Router({mergeParams:true})
productRouter.use("/:id/review",reviewRouter)
productRouter.route("/")
    .post(protectedRoutes,allowedTo("admin"),uploadFields([
        {name:"imgCover",maxCount:1},
        {name:"images",maxCount:10}

    ]),validation(addProductVal),addProduct)
    .get(getAllProducts)

productRouter.route("/:id")
    .get(validation(paramsIdVal),getSingleProduct)
    .put(protectedRoutes,allowedTo("admin"),uploadFields([
        {name:"imgCover",maxCount:1},
        {name:"images",maxCount:10}

    ]),validation(updateProductVal),updateProduct)
    .delete(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),deleteProduct)


export default productRouter