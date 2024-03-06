import  mongoose  from "mongoose";

const schema=new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"name already exists"],
        trim:true,
        required: [true, "name is required"],
        minLength:[2,"too short subcategory name"]

    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"category"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }

},{timestamps:true})
schema.pre("find",function(){
    this.populate("category")
})

export const subCategoryModel=mongoose.model("subCategory",schema)