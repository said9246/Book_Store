const cloudinary = require("cloudinary");
const User = require("../Model/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.testuser = (req, res) => {
    res.send("Hello, World! Work yes ");
};



exports.SignUp = async (req, res,next) => {
    try {
        const { username, email, password, avatar } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("User already existss", 400));
        }

        // Upload avatar to Cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "bookstore",
        });
        

        // Create new user with avatar details
        const newUser = await User.create({
            username,
            email,
            password,
            avatar: myCloud.secure_url
        });

        // Generate JWT token
        const token = newUser.generateToken();

        res.status(201).json({ message: "User created successfully", user: newUser, token });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
};





// 🔹 User Login (Sign In)
exports.SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if the password is correct
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = user.generateToken();

        res.status(200).json({ message: "Sign-in successful", user, token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }  
};

// 🔹 User Logout (Sign Out)
exports.SignOut = async (req, res) => {
    try {
        res.cookie("token", "", { expires: new Date(0), httpOnly: true }); // Clear token
        res.status(200).json({ message: "Sign-out successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
