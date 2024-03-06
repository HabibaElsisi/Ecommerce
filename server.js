process.on('uncaughtException',(err)=>{
    console.log('error',err);
})
import dotenv from "dotenv"
import express from 'express'
import { dbConnection } from './Database/db_Connection.js'
import { bootstrap } from './src/modules/index.routes.js'
import cors from "cors"
dotenv.config()
const app = express()
const port = 3000
dbConnection()
app.use(cors())
app.use(express.json())
app.use("/uploads",express.static("uploads"))
bootstrap(app)


process.on('unhandledRejection', (err) => {
    console.log('error',err);
})



app.listen(process.env.PORT||port, () => console.log(`Example app listening on port ${port}!`))