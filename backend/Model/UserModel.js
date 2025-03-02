const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter username"],
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
    },
    avatar: {
        type: String,
        required: true,
      }
      
});

// 🔹 Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 🔹 Method to compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// 🔹 Method to generate JWT token
UserSchema.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
