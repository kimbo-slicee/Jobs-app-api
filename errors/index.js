const {CustomError}=require("./CustomError");
const BadRequestError=require("./BadRequestError");
const UnauthenticatedError = require("./UnauthnticatedError");
const NotFound = require("./NotFound");
module.exports={
    CustomError,
    BadRequestError,
    UnauthenticatedError,
    NotFound
}
