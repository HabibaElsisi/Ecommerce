import express from "express"
import { addSubcategory, deleteSubCategory, getAllSubCategories, getSingleSubCatergory, updateSubCategory } from "./subcategory.controller.js"
import { validation } from "../../middleware/validation.js"
import { addSubCategoryVal, paramsIdVal, updateSubCategoryVal } from "./subcategory.validation.js"
import productRouter from "../product/product.routes.js"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"
const subCategoryRouter=express.Router({mergeParams:true})
subCategoryRouter.use("/:id/product",productRouter)

subCategoryRouter.route("/")
    .post(protectedRoutes,allowedTo("admin"),validation(addSubCategoryVal),addSubcategory)
    .get(getAllSubCategories)

subCategoryRouter.route("/:id")
    .get(validation(paramsIdVal),getSingleSubCatergory)
    .put(protectedRoutes,allowedTo("admin"),validation(updateSubCategoryVal),updateSubCategory)
    .delete(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),deleteSubCategory)

export default subCategoryRouter