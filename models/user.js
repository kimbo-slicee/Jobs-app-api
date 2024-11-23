const  mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
            required:[true,"PLEASE PROVIDE A NAME"],
            minLength:4,
            maxLength:20
    },
    email:{
        type:String,
        required:[true,"PLEASE PROVIDE A MAIL"],
        minLength:4,
        maxLength:20,
        match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique:true
    },
    password:{
        type:String,
        required:[true,"PLEASE PROVIDE A Password"],
        minLength:4,
        unique:true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Restricts to these values
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

})

userSchema.pre('save',async function(next){
    // before savng user in data base we encrypting our password using
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next()
})
// Send Name
userSchema.methods.getName=function (){
    return this.name;
}
// send Email;
userSchema.methods.getEmail=function (){
    return this.email
}
userSchema.methods.createJWT=function (){
 return jwt.sign({userID:this._id,name:this.name,role:this.role},process.env.JWT_SECRETE,{expiresIn:process.env.JWT_LIFETIMIE})
}
// check if the user password match the sorted password
userSchema.methods.comparePassword=async function(userPass){
    return await bcrypt.compare(userPass, this.password)
}
module.exports= mongoose.model('User', userSchema);
// I want u to answer this Question : why I'm not using arrow function ?? 🤔
// Create new JWT For new uer instance
