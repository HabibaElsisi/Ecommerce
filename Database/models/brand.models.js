import  mongoose  from "mongoose";

const schema=new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"name already exists"],
        trim:true,
        required: [true, "name is required"],
        minLength:[2,"too short brand name"]

    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    logo:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})
schema.post("init",function(doc){
    doc.logo=process.env.baseURL +"uploads/"+ doc.logo
})
schema.post("save",function(){
    this.logo=process.env.baseURL +"uploads/"+ this.logo
})
export const brandModel=mongoose.model("brand",schema)