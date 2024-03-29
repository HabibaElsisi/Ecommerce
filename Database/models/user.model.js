import  mongoose  from "mongoose";
import bcrypt from "bcrypt"
const schema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required: [true, "name is required"],

    },
    email:{
        type:String,
        required:[true,"email is required"],
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    isActive:{
        type:String,
        default:true
    },
    emailVerify:{
        type:String,
        default:false
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
        lowercase:true
    },
    passwordChangedAt:Date,
    wishlist:[{
        type:mongoose.Types.ObjectId,
        ref:"product"
    }],
    addresses:[{
        street:String,
        phone:String,
        city:String
    }]
},{timestamps:true})
schema.pre("save",function(){
    console.log(this)
    this.password=bcrypt.hashSync(this.password,8)
})

schema.pre("findOneAndUpdate",function(){
  if(this._update.password){
    this._update.password=bcrypt.hashSync(this._update.password,8)
  }
})
export const userModel=mongoose.model("user",schema)