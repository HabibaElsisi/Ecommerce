import mongoose from "mongoose"
const schema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"name is required"],
        minLength:[2,"too short category name"],
        unique:[true,"this category name already exists "]

    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    image:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})
schema.post("init",function(doc){
    doc.image=process.env.baseURL +"uploads/"+ doc.image
})
schema.post("save",function(){
    this.image=process.env.baseURL +"uploads/"+ this.image
})
export const categoryModel=mongoose.model("category",schema)
