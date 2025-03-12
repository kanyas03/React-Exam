import express,{json} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { adminauth } from './Routes/adminauth.js'

dotenv.config();
 const app =express();
 app.use(json());

 app.use(cors({
    origin:'*'

 }))
 app.use('/' ,adminauth);

 mongoose.connect('mongodb://localhost:27017/students1').then(()=>{
    console.log("Mongodb connected Successfully to students");})
    .catch((error)=>{
        console.error("Mongodb connection failed",error);
});
app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
    
});