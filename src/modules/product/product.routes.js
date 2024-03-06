import express from "express"
import { uploadFields } from "../../services/fileUploads/fileUploads.js"
import {addProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct} from "./product.controller.js"
import { validation } from "../../middleware/validation.js"
import { addProductVal, paramsIdVal, updateProductVal } from "./product.validation.js"
import reviewRouter from "../review/review.routes.js"

const productRouter=express.Router({mergeParams:true})
productRouter.use("/:id/review",reviewRouter)
productRouter.route("/")
    .post(uploadFields([
        {name:"imgCover",maxCount:1},
        {name:"images",maxCount:10}

    ]),validation(addProductVal),addProduct)
    .get(getAllProducts)

productRouter.route("/:id")
    .get(validation(paramsIdVal),getSingleProduct)
    .put(uploadFields([
        {name:"imgCover",maxCount:1},
        {name:"images",maxCount:10}

    ]),validation(updateProductVal),updateProduct)
    .delete(validation(paramsIdVal),deleteProduct)


export default productRouter