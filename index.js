import express from "express";
 import 'dotenv/config'
 import dbConnect from "./dbConntect.js";
 import userRouter from "./Routers/users.Router.js";
 import cookieParser from "cookie-parser";
 import cors from 'cors';



const server = express();

const port = process.env.PORT || 3000;
const option = {
    origin : ' http://localhost:5174',
    Credential : true,
}

server.use(express.json());
server.use(express.urlencoded({extended : true}));
server.use(cookieParser());
server.use(cors(option));


server.use("/user",userRouter);

dbConnect().then(()=>{
    console.log("database connected successfully");
    try{
        server.listen(port,()=>{
            console.log("server is running on ",`http://localhost:${port}/`);
        })
    }catch(error){console.log({result : false ,measage :"sever is not running",err : error}) }  

}).catch(()=>{
    console.log("data is not connected");
})


