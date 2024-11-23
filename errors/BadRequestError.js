const {StatusCodes}=require("http-status-codes")
const {CustomError} = require("./CustomError");
class BadRequestError extends CustomError {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.statusCode = StatusCodes.BAD_REQUEST; // HTTP status for bad request
    }
}

// const validateUserInput = (name, email, password) => {
//     if (!name || !name.trim()) throw new BadRequestError("Name is required");
//     if (!email || !email.trim()) throw new BadRequestError("Email is required");
//
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         throw new BadRequestError("Invalid email format");
//     }
//
//     if (!password || password.length < 6) {
//         throw new BadRequestError("Password must be at least 6 characters long");
//     }
// };
//
// // Example usage
// try {
//     validateUserInput("John", "john.doe@example.com", "pass");
// } catch (error) {
//     if (error instanceof BadRequestError) {
//         console.error(`${error.name}: ${error.message}`); // Handle the custom error
//     } else {
//         console.error("An unexpected error occurred:", error);
//     }
// }
module.exports=BadRequestError
