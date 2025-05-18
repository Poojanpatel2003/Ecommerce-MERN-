import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/Mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app=express()
const port=process.env.PORT || 4000
connectDB();
connectCloudinary()
//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.get('/',(req,res)=>{
    res.send("API Working");
})
app.use('/api/user',userRouter);



app.listen(port,()=>{
    console.log('Server running on PORT: '+port)
})