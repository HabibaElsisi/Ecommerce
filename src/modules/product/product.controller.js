
import slugify from "slugify"
import { productModel } from "../../../Database/models/product.model.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne } from "../handlers/handle.js"
import { ApiFeature } from "../../utils/apiFeature.js"



const addProduct=catchError(async(req,res,next)=>{
    let isProductExists=await productModel.findOne({title:req.body.title})
    if(isProductExists)return next(new AppError(`this Product already exists`,404))

    req.body.imgCover=req.files.imgCover[0].filename
    req.body.images=req.files.images.map((img)=>img.filename)//images finally have all img filename

    req.body.slug=slugify(req.body.title)
    let product=new productModel(req.body)
    await product.save()
    res.json({message:"Product added successfully",product})
})

const getAllProducts=catchError(async(req,res,next)=>{
    let filterObj={}
    if(req.params.id){
        filterObj.subcategory=req.params.id
    }

    let apiFeatures=new ApiFeature(productModel.find(filterObj), req.query).fields().pagination().sort().search().filter()

    let product= await apiFeatures.mongooseQuery
    res.json({message:"this is all Products",page:apiFeatures.pageNumber,product})

})

const getSingleProduct=catchError(async(req,res,next)=>{
    let product= await productModel.findById(req.params.id)
    if(!product) return next(new AppError(`this Product not found`,404))
    res.json({message:"success",product})

})

const updateProduct=catchError(async(req,res,next)=>{
    if(req.body.title){
        req.body.slug=slugify(req.body.title)
    }
    if(req.files.imgCover){
        req.body.imgCover=req.files.imgCover[0].filename
    }
        
     if(req.files.images){ 
        req.body.images=req.files.images.map((img)=>img.filename)
    }
    let product= await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!product) return next(new AppError(`this catergory not found `,404))
   
    res.json({message:"Product updated successfully",Product})
})

const deleteProduct=deleteOne(productModel)


export {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}