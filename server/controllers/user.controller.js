import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true
};

const register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return next(new AppError("All fields are required", 400));
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return next(new AppError("Email already exists", 400));
        }

        const user = await User.create({
            fullName,
            email,
            password,
            avatar: {
                public_id: email,
                secure_url: ""
            }
        });

        if (!user) {
            return next(
                new AppError(
                    "User registration failed, please try again",
                    400
                )
            );
        }

        // TODO

        if(req.file) {
            try{
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                    width: 250,
                    height: 250,
                    gravity: 'faces',
                    crops: 'fill'
                });

                if(result) {
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;

                    // 
                }
            } catch (err) {

            }

        }

        user.password = undefined;

        const token = user.generateJWTToken();

        res.cookie("token", token, cookieOptions);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });

    } catch (error) {
        return next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(
                new AppError("Email and password are required", 400)
            );
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(
                new AppError("Invalid email or password", 401)
            );
        }

        const isPasswordValid =
            await user.comparePassword(password);

        if (!isPasswordValid) {
            return next(
                new AppError("Invalid email or password", 401)
            );
        }

        const token = await user.generateJWTToken();

        user.password = undefined;

        res.cookie("token", token, cookieOptions);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user
        });

    } catch (error) {
        return next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(0),
            httpOnly: true,
            secure: true
        });

        res.status(200).json({
            success: true,
            message: "User logged out successfully"
        });

    } catch (error) { 
        return next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return next(
                new AppError("User not found", 404)
            );
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        return next(error);
    }
};

export {
    getProfile, login,
    logout, register
};

