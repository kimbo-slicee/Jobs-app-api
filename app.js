require('dotenv').config();
require('express-async-errors');
const express=require("express");
const app=express();
const port=process.env.PORT || 5000;
const jobsRouter=require("./routes/jobes")
const authRouter=require("./routes/auth")
// ConnectionDB
const connectionDB=require("./DB/connectDB");
// Extra security packages
const helmet=require("helmet");
const cors =require("cors");
const xss=require("xss-clean");
const rateLimit=require("express-rate-limit");
app.use(helmet())
app.use(cors())
app.use(xss());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
}))
//my Middlewares
const notFound=require("./middlewares/notFoundError");
const errorHandler=require("./middlewares/errorHandler");
const authMiddleware = require("./middlewares/authMiddleware");
// Middlewares
app.use(express.json());
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',authMiddleware,jobsRouter);
// 404 Not Found Handler (this should be the last one)
app.use(notFound);
// Global error handler (for other types of errors)
app.use(errorHandler);

//Extra packages
//routes
const start=async ()=>{
    try{
        await connectionDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`PORT LISTING IN ${port}`);
        })
    }catch (error){
        console.log(error)
    }
}
start()
