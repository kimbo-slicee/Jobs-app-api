const mongoose =require("mongoose");
const JobSchema=new mongoose.Schema({
company:{
type:String,
    require:[true,"PROVIDE COMPANY NAME NAME"],
    maxLength:25,

},
position:{
    type:String,
    require:[true,"PROVIDE YOUR POSITION NOW"],
    maxLength:100
},
status:{
    type:String,
    enum:["interview","c","pending"],
    default:"pending"
},
createdBy:{
    type:mongoose.Types.ObjectId,
    ref:'User',
    required:[true,"Please provide USER"],

}
},{timestamps:true});
module.exports=mongoose.model("JOB",JobSchema);