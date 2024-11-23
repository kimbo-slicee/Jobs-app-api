const { UnauthenticatedError } = require("../errors");
const { verify } = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        throw new UnauthenticatedError("Authentication invalid One ");
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload =  verify(token, process.env.JWT_SECRETE);
        const user = await User.findById(payload.userID).select("-password");
        if (!user) {
            throw new UnauthenticatedError("User not found");
        }
        req.user = { userId: user._id, role: user.role, name:user.name };
        next();
    } catch (error) {
        console.log(error);
        next(new UnauthenticatedError("Authentication invalid Two "));
    }
};

module.exports = authMiddleware;
