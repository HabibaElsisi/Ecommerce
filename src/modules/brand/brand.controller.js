
import slugify from "slugify"
import { brandModel } from "../../../Database/models/brand.models.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { deleteOne } from "../handlers/handle.js"
import { ApiFeature } from "../../utils/apiFeature.js"


const addBrand=catchError(async(req,res,next)=>{
    let isBrandExists=await brandModel.findOne({name:req.body.name})
    if(isBrandExists)return next(new AppError(`this Brand already exists`,404))
    req.body.logo=req.file.filename
    req.body.slug=slugify(req.body.name)
    let brand=new brandModel(req.body)
    await brand.save()
    res.json({message:"Brand added successfully",brand})
})

const getAllBrands=catchError(async(req,res,next)=>{

    let apiFeatures=new ApiFeature(brandModel.find(), req.query).fields().pagination().sort().search().filter()

    let brand= await apiFeatures.mongooseQuery

    res.json({message:"this is all Brands",page:apiFeatures.pageNumber,brand})

})
const getSingleBrand=catchError(async(req,res,next)=>{
    let brand= await brandModel.findById(req.params.id)
    if(!brand) return next(new AppError(`this brand not found`,404))
    res.json({message:"success",brand})

})

const updateBrand=catchError(async(req,res,next)=>{
    if(req.body.name){
        req.body.slug=slugify(req.body.name)
    }
     if(req.file){ 
        req.body.logo=req.file.filename
     }
    let brand= await brandModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!brand) return next(new AppError(`this catergory not found `,404))
   
    res.json({message:"Brand updated successfully",brand})
})

const deleteBrand=deleteOne(brandModel)


export {
    addBrand,
    getAllBrands,
    getSingleBrand,
    updateBrand,
    deleteBrand
}