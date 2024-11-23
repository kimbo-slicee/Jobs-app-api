const {StatusCodes, }=require("http-status-codes");
const {BadRequestError, UnauthenticatedError} = require("../errors");
const User=require("../models/user")
// Create new user
const register=async (req,res)=>{
    // The Validation inside the Schema (Validation in UserSchema Level);
    const user = await User.create({...req.body},);// name , email , password
    // invoke create JWT func and create new JWT
    const token= user.createJWT();
    res.status(StatusCodes.CREATED).json({token});
}
// Login Controller:  check authentication
const login= async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
    throw new BadRequestError("Please Provide email and Password ")
    }
    // looking for this mail in data base to get roles and permissions
    const user =await User.findOne({email});
    if(!user) throw new UnauthenticatedError("Invalid Credentials X ");
    // compare password
    const isPasswordValid =user.comparePassword(password);
    // You Can also check for password correspondent here but by adding if condition but the best pratice to do it
    // in the User Model
    if(!isPasswordValid) throw new UnauthenticatedError("Invalid Credentials");// status code 401
    const token =user.createJWT();// if the user email exist and the password correct we create new JWT
    res.status(200).json({user:user.getName(),email:user.getEmail(),token:token});
}
module.exports={
    register,
    login
}