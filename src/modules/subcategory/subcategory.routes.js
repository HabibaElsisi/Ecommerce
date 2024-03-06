import express from "express"
import { addSubcategory, deleteSubCategory, getAllSubCategories, getSingleSubCatergory, updateSubCategory } from "./subcategory.controller.js"
import { validation } from "../../middleware/validation.js"
import { addSubCategoryVal, paramsIdVal, updateSubCategoryVal } from "./subcategory.validation.js"
import productRouter from "../product/product.routes.js"
const subCategoryRouter=express.Router({mergeParams:true})
subCategoryRouter.use("/:id/product",productRouter)

subCategoryRouter.route("/")
    .post(validation(addSubCategoryVal),addSubcategory)
    .get(getAllSubCategories)

subCategoryRouter.route("/:id")
    .get(validation(paramsIdVal),getSingleSubCatergory)
    .put(validation(updateSubCategoryVal),updateSubCategory)
    .delete(validation(paramsIdVal),deleteSubCategory)

export default subCategoryRouter