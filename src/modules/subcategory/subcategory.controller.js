
import { categoryModel } from "../../../Database/models/catrgory.model.js"
import { subCategoryModel } from "../../../Database/models/subCategory.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import slugify from "slugify"
import { deleteOne } from "../handlers/handle.js"
import { ApiFeature } from "../../utils/apiFeature.js"


const addSubcategory=catchError(async(req,res,next)=>{
    let isSubcategoryExists=await subCategoryModel.findOne({name:req.body.name})
    if(isSubcategoryExists)return next(new AppError(`this Subcategory already exists`,404))
    req.body.slug=slugify(req.body.name)
    let subcategory=new subCategoryModel(req.body)
    await subcategory.save()
    res.json({message:"Subcategory added successfully",subcategory})
})

const getAllSubCategories=catchError(async(req,res,next)=>{
    let filterObject={}
    if(req.params.category){
        filterObject.category=req.params.category
    }

    let apiFeatures=new ApiFeature(subCategoryModel.find(filterObject), req.query).fields().pagination().sort().search().filter()

    let subcategory= await apiFeatures.mongooseQuery

    
    res.json({message:"this is all subcategories", page:apiFeatures.pageNumber,subcategory})

})

const getSingleSubCatergory=catchError(async(req,res,next)=>{
    let subcategory= await subCategoryModel.findById(req.params.id)
    if(!subcategory) return next(new AppError(`this subcategory not found`,404))
    res.json({message:"success",subcategory})

})

const updateSubCategory=catchError(async(req,res,next)=>{
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }

   
    let subcategory= await subCategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!subcategory) return next(new AppError(`this subcategory not found `,404))
   
    res.json({message:"subcategory updated successfully",subcategory})
})

const deleteSubCategory=deleteOne(subCategoryModel)




export {
    addSubcategory,
    getAllSubCategories,
    getSingleSubCatergory,
    updateSubCategory,
    deleteSubCategory,

}