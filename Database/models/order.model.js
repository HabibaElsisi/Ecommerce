
import  mongoose  from "mongoose";

const schema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    orderItems:[
        {
            product:{type:mongoose.Types.ObjectId,ref:"product"},
            quantity:Number,
            price:Number
        }
    ],
    totalOrderPrice:Number,
    shippingAddress:{
        street:String,
        city:String,
        phone:String
    },
    paymentType:{
        type:String,
        enum:["cash","card"],
        default:"cash"
    },
    isDelievered:{
        type:Boolean,
        default:false
    },
    deliveredAt:{
        type:Date 
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:{
        type:Date
    },
    isCanceld:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true})

export const orderModel=mongoose.model("order",schema)