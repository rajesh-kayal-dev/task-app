import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { errorHandler } from "../utils/error.js";

dotenv.config();

export const signup = async (req, res, next) => {

    const { name, email, password, profilePicture, adminJoinCode } = req.body;

    if (!name || !email || !password || name === "" || email === "" || password === "") {
        return next(errorHandler(400, "All fields are required"));
    }

    //check if user already exists
    const isAlredyExists = await User.findOne({ email })

    if (isAlredyExists) {
        return next(errorHandler(400, "User already exists"));
    }

    //check user role
    let role = 'user';
    if (adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE) {
        role = 'admin';
    }

    const hashedPassword = bcryptjs.hashSync(password, 8);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profilePicture,
        role
    })
    try {
        await newUser.save();
        res.json("Signup successful");

    } catch (error) {
        next(error);
    }
}