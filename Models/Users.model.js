import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const {Schema,model} = mongoose;

const Address = new Schema({
    city : {type : String , require:true},
    landMark : {type : String , required :true},
    pinCode : {type :Number ,required : true}
})

const userSchema = new Schema({
    userName : {type : String , min : [2,"username is sort"]},
    email : {type : String , require : true,unique : true},
    password : {type :String , require :true ,min:[8," password too sort "]},
    phoneNumber : {type :Number,min:[10,"not a vaild number"],max:[10,"not a vaild number"]},
    address : {type :[Address],default:[]}

})

userSchema.pre('save', async function (next){
    try{
        if(!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        next();
    }catch(error){console.log(error)}
});

userSchema.methods.comparePassword =  async function(password){


     return await bcrypt.compare(password,this.password);
  
}

userSchema.methods.generateToken = function (){
    try{
        const token = jwt.sign({id : this._id,email : this.email,password:this.password},process.env.PRIVATE_KEY);
        return token;
    }catch(error){
        console.log(error)

    }
    
}

const User = model("User",userSchema);

export default User;
