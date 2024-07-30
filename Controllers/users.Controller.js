
import User from "../Models/Users.model.js";



const cookie_option = {
    httpOnly : true,
    secure : true,
    sameSite : "None",
   // maxAge : 6000,  /// after one cookie si deleted automatically
  

   }
const signUP = async(req,res)=>{

  
   
    try{
        let {email} = req.body;
        let find_user =  await User.findOne({email:email});
         if(find_user) return res.send({result : false ,message : "user already exist"});
        let newUser  = new User(req.body);
        let saved_newUser =  await newUser.save();
        let jwt_token  = await  newUser.generateToken();

        res.
           status(200)
           .cookie("token" , jwt_token,cookie_option)
           .send({result : true , message : "User created successfully",data : saved_newUser});   
    }catch(error){
        res.status(500).send({result:false , error : error.message});
    }

}

const logIn = async (req,res)=>{

  try{
    let {email,password} = req.body;
    let find_user = await User.findOne({email : email});
    if(!find_user) return res.status(402).send({result : false,message : "User not exist please signUP"});
    let jwt_token  = await  find_user.generateToken();
    let password_check_result = await find_user.comparePassword(password);
    if(password_check_result === true)
        { 
            return res
                   .status(200)
                   .cookie("token",jwt_token,cookie_option)
                   .send({result:true , message : "user login successfully"});
        }
    else  return res.status(402).send({result : false,message : "password incorrect"})
  }catch(error){res.status(402).send({result : false ,message : error.message})};    
    
}

const updataUser =  async(req,res)=>{
    try{
        const user = req?.user;
        if(!user)
            {
                res.status(402).send({result : false ,message : "user need login"});
            }
        else{
            const {email} = req.user;
            const updated_data = await User.findOneAndUpdate({email:email},req.body,{new : true});
            res.status(200).send({result : true,message : "user updated successfully" , data : updated_data});
        }    
    }catch(error){res.status(402).send({result : false ,message : error.message});}
    
}

const getUser = async (req,res)=>{
    try{
        const user = req.user;
        if(!user)
            {
                res.status(402).send({result : false ,message : "user need login"});
            }
        else{

            res.status(200).send({result :true ,message : "user  successfully" , Data : req.user});

        }    
    }catch(error){ res.status(500).send({result:false , error : error.message});}
    
    
}


const logOut = (req,res)=>{
    try{
        const user = req?.user;
        if(!user)
            {
                res.status(402).send({result : false ,message : "user need login"});
            }
        else{
            res
               .status(200)
               .clearCookie("token",cookie_option)
               .send({result : true,message : "user logout successfully"});

        }    
    }catch(error){res.status(402).send({result : false ,message :error.message});}
    
}

export {signUP,logIn,updataUser,getUser,logOut} ;






//signup
//login 
//updataUser
//getUser
//logout
