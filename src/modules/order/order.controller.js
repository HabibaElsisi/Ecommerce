import { cartModel } from "../../../Database/models/cart.model.js"
import { orderModel } from "../../../Database/models/order.model.js"
import { productModel } from "../../../Database/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import Stripe from "stripe"
const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)

const createCashOrder=catchError(async(req,res,next)=>{
    let cart= await cartModel.findById(req.params.id)
    if(!cart) return next(new AppError(`this cart not found`,404))
    let totalOrderPrice=cart.totalPriceAfterDiscount?cart.totalPriceAfterDiscount:cart.totalPrice
    let order= new orderModel({
        user:req.user._id,
        orderItems:cart.cartItems,
        shippingAddress:req.body.shippingAddress,
        totalOrderPrice
    })
    await order.save()
    let options=cart.cartItems.map((prod)=>{
        return (
            {  
                updateOne :{
                "filter":{_id:prod.product},
                "update": {$inc:{sold:prod.quantity,quantity:-prod.quantity}},
                }
            }
        )
    })
    await productModel.bulkWrite(options)
    await cartModel.findByIdAndDelete(req.params.id)
    res.json({message:"your order created successfully",order})

}
)

const getSpecificOrder=catchError(async(req,res,next)=>{
    let order= await orderModel.findOne({user:req.user._id}).populate({ path: 'orderItems.product', options: { strictPopulate: false }})
    if(!order) return next(new AppError(`this order not found`,404))
    res.json({message:"this is your order",order})
    
})
const getALOrders=async(req,res,next)=>{
    let orders= await orderModel.find().populate("orderItems.product")
    res.json({message:"this is all orders",orders})

}

const createCheckOutSession=catchError(async(req,res,next)=>{
    let cart= await cartModel.findById(req.params.id)
    if(!cart) return next(new AppError(`this cart not found`,404))
    let totalOrderPrice=cart.totalPriceAfterDiscount?cart.totalPriceAfterDiscount:cart.totalPrice
    let session= await stripe.checkout.sessions.create({
        line_items:[{
            price_data:{
                currency:"egp",
                unit_amount:totalOrderPrice*100,
                product_data:{
                    name:req.user.name,
                }
            },
            quantity:1
        }],
        mode:"payment",
        success_url:"https://drive.google.com/drive/folders/1sGp-RRK0B1rTcCJ_yVRTAWBw7cwFrKRI",
        cancel_url:"https://drive.google.com/drive/folders/1sGp-RRK0B1rTcCJ_yVRTAWBw7cwFrKRI",
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress
    })
    res.json({message:"success",session})

}
)

export {
    createCashOrder,
    getSpecificOrder,
    getALOrders,
    createCheckOutSession
}

