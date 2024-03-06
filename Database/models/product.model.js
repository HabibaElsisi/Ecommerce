import  mongoose  from "mongoose";

const schema=new mongoose.Schema({
    title:{
        type:String,
        unique:[true,"title already exists"],
        trim:true,
        required: [true, "name is required"],
        minLength:[2,"too short product title"],
        maxLength:[100,"too long product title"]

    },
    description:{
        type:String,
        trim:true,
        required: [true, "name is required"],
        minLength:[10,"too short product description"],
        maxLength:[500,"too long product description"]
       
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    imgCover:String,
    images:[],
    price:{
        type:Number,
        min:0 ,
        required:true   
    },
    priceAfterDiscount:{
        type:Number,
        min:0 ,
        required:true 
    },
    quantity:{
        type:Number,
        min:0,
        default:1
    },
    sold:{
        type:Number
    },
    rateAvg:{
        type:Number,
        min:0,
        max:5
    },
    rateCount:{
        type:Number,
        min:0,
        default:0
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"category"
    },
    subcategory:{
        type:mongoose.Types.ObjectId,
        ref:"subcategory"
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:"brand"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },


},{timestamps:true,toJSON:{virtuals:true}})

schema.post("init",function(doc){
    if(doc.imgCover||doc.images){
    doc.imgCover=process.env.baseURL +"uploads/"+ doc.imgCover;
    doc.images = doc.images?.map((img) => process.env.baseURL + "uploads/" + img);
    }
})


schema.post("save",function(){
    this.imgCover=process.env.baseURL +"uploads/"+ this.imgCover;
    this.images=this.images.map((img)=>process.env.baseURL +"uploads/"+ img)
})

//to get all reviews on single product
schema.virtual("myReviews",{
    ref:"review",
    localField:"_id",//id of product model here
    foreignField:"product"//productId in review model
});

schema.pre("findOne",function(){
    console.log(this.populate("myReviews"))
})
export const productModel=mongoose.model("product",schema)