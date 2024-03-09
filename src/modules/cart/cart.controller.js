import { cartModel } from "../../../Database/models/cart.model.js";
import { couponModel } from "../../../Database/models/coupon.model.js";
import { productModel } from "../../../Database/models/product.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
const calcTotalPrice=(cart)=>{
    let totalPrice=0
    cart.cartItems.forEach((item)=>{
        totalPrice+=item.price*item.quantity
    })
    cart.totalPrice=totalPrice
    if(cart.discount){
        let totalPriceAfterDiscount=cart.totalPrice-(cart.totalPrice*cart.discount)/100
    cart.totalPriceAfterDiscount=totalPriceAfterDiscount
    cart.discount=coupon.discount
    }
}
const addToCart=catchError(async(req,res,next)=>{
    let product=await productModel.findById(req.body.product)
    if(!product) return next(new AppError(`this product not found`,404))
    req.body.user=req.user._id
    let isCartExists= await cartModel.findOne({user:req.user._id})
    req.body.price=product.price
    if(product.quantity<req.body.quantity) return next(new AppError(`sold out`))
    if(!isCartExists){
        let cart=new cartModel({
            user:req.user._id,
            cartItems:[req.body],
        })
        calcTotalPrice(cart)
        await cart.save()
        res.json({message:"product added successfully to cart",cart})

    }else{
    let item= isCartExists.cartItems.find((item)=>item.product==req.body.product)
    if(item) {
        item.quantity+=req.body.quantity||1
        if(item.quantity>product.quantity)return next(new AppError(`sold out`))
        
    }else isCartExists.cartItems.push(req.body)
    
    calcTotalPrice(isCartExists)
    await isCartExists.save()
    res.json({message:"product addedd successfully to cart",isCartExists})
    }
})

const removeItemFromCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOneAndUpdate(
        { user: req.user._id },
        { $pull: { cartItems: { _id: req.params.id } } },
        { new: true }
    );
    calcTotalPrice(cart)
    await cart.save()
    if (!cart) {
        return next(new AppError(`This cart was not found`, 404));
    }
    res.status(200).json({ message: "Product removed successfully from your cart", cart });
});


const updateQuantity=catchError(async(req,res,next)=>{
    let product= await productModel.findById(req.params.id)
    let cart=await cartModel.findOne({user:req.user._id})
    if(!cart) return next(new AppError(`cart not found`,404))
    let item = cart.cartItems.find((item) => {
        return item.product.toString() === req.params.id.toString()
    });
    if(!item) return next(new AppError(`item not found`,404))
    if(product.quantity<req.body.quantity) return next(new AppError(`sold out`))
    item.quantity=req.body.quantity
    calcTotalPrice(cart)
    await cart.save()
    res.status(200).json({message:"quantity updated successfully",cart})
})

const getLoggedInUserCart=catchError(async(req,res,next)=>{
    let cart=await cartModel.findOne({user:req.user._id})
    if(!cart)return next(new AppError(`this cart not found..create cart first`,404))
    res.json({message:"your cart",cart})

})

const clearUserCart=catchError(async(req,res,next)=>{
    let cart=await cartModel.findOneAndDelete({user:req.user._id})
    if(!cart) return next(new AppError(`this cart not found`,404))
    res.json({message:"cart cleared successfully",cart})
    
})

const applyCoupon=catchError(async(req,res,next)=>{
    let coupon= await couponModel.findOne({code:req.body.coupon , expires:{$gte:Date.now()}})
    if(!coupon) return next(new AppError(`invalid coupon`,401))
    let cart= await cartModel.findOne({user:req.user._id})
    let totalPriceAfterDiscount=cart.totalPrice-(cart.totalPrice*coupon.discount)/100
    cart.totalPriceAfterDiscount=totalPriceAfterDiscount
    cart.discount=coupon.discount
    await cart.save()
    res.json({message:"coupon applied successfully",cart})
    
})

export{
    addToCart,
    removeItemFromCart,
    updateQuantity,
    getLoggedInUserCart,
    clearUserCart,
    applyCoupon
}