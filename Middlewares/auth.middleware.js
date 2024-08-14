import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../Models/Users.model.js';

const auth = async (req,res,next)=>{
   
   try{
     const token =  req.cookies?.token; //req.cookies.get(token) || undefined; 
    if(!token)
        {
            return res.status(402).send({result : false ,message : "User not verifed || user no login "});
        }
     else{
        const {id} = jwt.verify(token,process.env.PRIVATE_KEY );
        const user_data = await User.findById({_id : id});
        req.user = user_data;
        next();

     } 

   }catch(error){res.status(402).send({result : false ,message : error.message})}


   
}

export default auth;