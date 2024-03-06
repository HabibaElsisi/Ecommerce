import { categoryModel } from "../../../Database/models/catrgory.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import slugify from "slugify"
import { deleteOne } from "../handlers/handle.js"
import { ApiFeature } from "../../utils/apiFeature.js"


const addCategory=catchError(async(req,res,next)=>{
    let isCategoryExists=await categoryModel.findOne({name:req.body.name})
    if(isCategoryExists)return next(new AppError(`this category already exists`,404))
    req.body.image=req.file.filename
    req.body.slug=slugify(req.body.name)
    let category=new categoryModel(req.body)
    await category.save()
    res.json({message:"category added successfully",category})
})

const getAllCategories=catchError(async(req,res,next)=>{

    let apiFeatures=new ApiFeature(categoryModel.find(), req.query).fields().pagination().sort().search().filter()

    let category= await apiFeatures.mongooseQuery

    res.json({message:"this is all categories", page:apiFeatures.pageNumber,category})
})
const getSingleCatergory=catchError(async(req,res,next)=>{
    let category= await categoryModel.findById(req.params.id)
    if(!category) return next(new AppError(`this category not found`,404))
    res.json({message:"success",category})

})

const updateCategory=catchError(async(req,res,next)=>{
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }
     if(req.file){ 
        req.body.image=req.file.filename
     }

   
    let category= await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!category) return next(new AppError(`this catergory not found `,404))
   
    res.json({message:"category updated successfully",category})
})

const deleteCategory=deleteOne(categoryModel)


export {
    addCategory,
    getAllCategories,
    getSingleCatergory,
    updateCategory,
    deleteCategory
}