const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/ErrorHandler");

// 🔹 Middleware to check if user is authenticated
exports.isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return next(new ErrorHandler("Not authorized, no token", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return next(new ErrorHandler("User not found", 404));
        }

        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid token", 401));
    }
});
