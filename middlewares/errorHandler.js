const {CustomError} = require("../errors");
const { StatusCodes } = require('http-status-codes'); // Import standardized status codes

const errorHandler = (err, req, res,next) => {
    console.log(err)
    let customError={
        // set Default Value;
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || "Something went wrong try again later"
    }
    if (err instanceof CustomError) {
        next(); // fixed unattached error by adding next methode in errorHandler middleware
        return res.status(err.statusCode).json({ msg: err.message });
    }
    if(err.code && err.code===11000){
        customError.msg=`DUPLICATE VALUE ENTERED ${Object.keys(err.keyValue).toString().toUpperCase()} Field , Please choose another value `
        customError.statusCode=400;
    }
    if(err.name==="CastError"){
        customError.msg="NO JOB WITHE THIS VALUE"
        customError.statusCode=StatusCodes.NOT_FOUND
    }
    return res.status(customError.statusCode).json({message:customError.msg});
};

module.exports = errorHandler;
/**
 express-async-errors, which is specifically designed to handle errors in asynchronous Express route handlers
 without the need for a custom wrapper function. It's a very convenient tool if you want to reduce boilerplate code even further.
 */