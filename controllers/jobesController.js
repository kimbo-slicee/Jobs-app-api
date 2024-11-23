// CRUDE Operations
const job=require("../models/job");
const {StatusCodes}=require("http-status-codes");
const {BadRequestError,NotFound}=require("../errors");
// Fetch All tasks for the login user
const getAllJobs=async (req, res)=>{
    // add Pagination
    const limit=Number(req.query.limit) || 5;
    const page=Number(req.query.page) || 1 ;// in FrontEnd we should increment page number when we add new Items
    const skip  =(page-1)*limit; // pagination algorithm
    const AlluresJobs=await job.find({createdBy:req.user.userId})
        .sort("-createdAt")
        .limit(limit)
        .skip(skip)
    res.status(StatusCodes.OK).json({AlluresJobs,count:AlluresJobs.length});
}
const getJob=async (req,res)=> {
    // get one job by using Id or search by name using query params let's go
    const {user:{userId},params:{id:jobId}}=req;// nested distracting
    const jobById=await job.findOne(
        {
        _id:jobId,
        createdBy:userId}
    );
    if(!jobById) throw new NotFound(`Job with Id  ${jobById}`);
    res.status(StatusCodes.OK).json({data:jobById});
}
const createJob=async (req,res)=>{
    req.body.createdBy=req.user.userId;
    const newJob=await job.create(req.body);
    res.status(StatusCodes.CREATED).json({data:newJob});

}
const updateJob=async (req,res)=>{
    const {
         body:{company,position},
         user:{userId}
        ,params:{id:jobId},

        }=req;// nested distracting
    if(company === '' || position==='') throw new BadRequestError("Company or position can't be empty ");
    const upDatedJob=await job.findByIdAndUpdate(
        {_id:jobId, createdBy:userId}, req.body, {new:true,runValidators:true});
    if(!upDatedJob) throw new NotFound("JOB DOESN'T EXIST ");
    res.status(200).json({data:upDatedJob});
}
const deleteJob=async (req,res)=>{
    const {user:{userId},params:{id:jobId}}=req;
    const deletedJob=await job.findByIdAndDelete({_id:jobId,createdBy:userId});
    if(!deletedJob) throw new NotFound("JOB DOESN'T EXIST ");
    res.status(200).json({success:true ,msg:"Job Deleted successfully "});
}

module.exports={
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}