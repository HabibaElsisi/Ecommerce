import express from "express"
import { addCategory, deleteCategory, getAllCategories, getSingleCatergory, updateCategory } from "./category.controller.js"
import { validation } from "../../middleware/validation.js"
import { addCategoryVal, paramsIdVal, updateCategoryVal } from "./category.validation.js"
import { uploadSingleFile } from "../../services/fileUploads/fileUploads.js"
import subCategoryRouter from "../subcategory/subcategory.routes.js"
import { protectedRoutes } from "../../middleware/protectedRoutes.js"
import { allowedTo } from "../../middleware/allowedTo.js"

const categoryRouter=express.Router()
categoryRouter.use("/:category/subcategory",subCategoryRouter)
categoryRouter.route("/")
    .post(protectedRoutes,allowedTo("admin"),uploadSingleFile("img"),validation(addCategoryVal),addCategory)
    .get(getAllCategories)

categoryRouter.route("/:id")
    .get(validation(paramsIdVal),getSingleCatergory)
    .put(protectedRoutes,allowedTo("admin"),uploadSingleFile("img"),validation(updateCategoryVal),updateCategory)
    .delete(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),deleteCategory)

export default categoryRouter