import { globalError } from "../middleware/globalErrorHandling.js"
import { AppError } from "../utils/AppError.js"
import addressRouter from "./address/address.routes.js"
import authRouter from "./auth/auth.routes.js"
import brandRouter from "./brand/brand.routes.js"
import cartRouter from "./cart/cart.routes.js"
import categoryRouter from "./category/category.routes.js"
import couponRouter from "./coupon/coupon.routes.js"
import orderRouter from "./order/order.routes.js"
import productRouter from "./product/product.routes.js"
import reviewRouter from "./review/review.routes.js"
import subCategoryRouter from "./subcategory/subcategory.routes.js"
import userRouter from "./user/user.routes.js"
import wishlistRouter from "./wishlist/wishlist.routes.js"

export const bootstrap=(app)=>{

    app.use("/api/v1/category",categoryRouter)
    app.use("/api/v1/subcategory",subCategoryRouter)
    app.use("/api/v1/brand",brandRouter)
    app.use("/api/v1/product",productRouter)
    app.use("/api/v1/user",userRouter)
    app.use("/api/v1/auth",authRouter)
    app.use("/api/v1/review",reviewRouter)
    app.use("/api/v1/wishlist",wishlistRouter)
    app.use("/api/v1/address",addressRouter)
    app.use("/api/v1/coupon",couponRouter)
    app.use("/api/v1/cart",cartRouter)
    app.use("/api/v1/order",orderRouter)









    
    app.use('*', (req, res, next) => {
        next(new AppError("not found endPoint", 400))
    })
    
    app.use(globalError)
}