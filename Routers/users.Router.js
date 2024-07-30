import express from 'express';
import { signUP,logIn,updataUser,getUser,logOut } from '../Controllers/users.Controller.js';
import auth from "../Middlewares/auth.middleware.js";

const userRouter = express.Router();




userRouter.post("/signup",signUP)
          .post("/login",logIn)
          .patch("/",auth,updataUser)
          .get("/",auth,getUser)
          .post("/logout",auth,logOut);


          export default userRouter;