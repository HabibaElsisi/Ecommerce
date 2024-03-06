import  mongoose  from "mongoose"

export const dbConnection=()=>{
    mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>console.log("database connected"))
    .catch((err)=>{
        console.log("database error ",err)
    })
}



//username>>newECommerce
//password>>newECommerceNodec41