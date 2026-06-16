import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import cloudinary from "cloudinary";
import fs from 'fs/promises';
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

console.log("🔥 USER CONTROLLER LOADED");

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
};

const register = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        console.log("REGISTER HIT");
        console.log("BODY =>", req.body);
        console.log("FILE =>", req.file);

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

        console.log('File Details >', JSON.stringify(req.file));
        if (req.file) {
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                    folder: 'lms',
                    width: 250,
                    height: 250,
                    crop: 'fill',
                    gravity: 'face'
                });

                if (result) {
                    user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;

                    await user.save();

                    // Remove file from server
                    await fs.rm(`uploads/${req.file.filename}`);
                }
            } catch (err) {
                console.log("CLOUDINARY ERROR =>", err);

                return next(
                    new AppError(err.message || 'File not uploaded, Please try again', 500)
                );
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
        res.clearCookie("token", cookieOptions);

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

const forgotPassword = async (req, res, next) => {
    try {
        console.log("🔥 FORGOT PASSWORD HIT");

        const { email } = req.body;

        if (!email) {
            return next(new AppError("Email is required", 400));
        }

        const user = await User.findOne({ email });

        if (!user) {
            return next(new AppError("Email not registered", 400));
        }

        const resetToken = await user.generatePasswordResetToken();

        await user.save();

        console.log("🔥 RESET TOKEN (USE THIS):", resetToken);

        const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const subject = "Reset Password";

        const message = `
            <h2>Password Reset Request</h2>
            <p>Click the link below to reset your password:</p>
            <a href="${resetPasswordUrl}">
                Reset Password
            </a>
        `;

        try {
            await sendEmail(email, subject, message);

            return res.status(200).json({
                success: true,
                message: "Reset email sent successfully",
                resetToken // ✅ TEMP FOR TESTING
            });

        } catch (err) {
            user.forgotPasswordExpiry = undefined;
            user.forgotPasswordToken = undefined;
            await user.save();

            return next(err);
        }

    } catch (error) {
        return next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        console.log("🔥 RESET PASSWORD HIT");

        const { resetToken } = req.params;
        const { password } = req.body;

        if (!resetToken) {
            return next(new AppError("Token missing in URL", 400));
        }

        const forgotPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        const user = await User.findOne({
            forgotPasswordToken,
            forgotPasswordExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return next(
                new AppError("Token is invalid or expired", 400)
            );
        }

        user.password = password;
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });

    } catch (error) {
        return next(error);
    }
};


const changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    if (!oldPassword || !newPassword) {
        return next(
            new AppError('All fields are mandatory', 400)
        )
    }

    const user = await User.findById(id).select('+password');

    if (!user) {
        return next(
            new AppError('User does not exists', 400)
        )
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if (!isPasswordValid) {
        return next(
            new AppError('User does not exists', 400)
        )
    }

    user.password = newPassword;

    await user.save();

    user.password = undefined;

    res.status(200).json({
        success: true,
        message: 'Password changed successfully!!'
    });

}

const updateUser = async (req, res, next) => {
    try {
        const { fullName } = req.body;
        const id = req.user.id;

        const user = await User.findById(id);

        if (!user) {
            return next(new AppError('User does not exist', 400));
        }

        if (fullName) {
            user.fullName = fullName;
        }

        if (req.file) {
            if (user.avatar?.public_id) {
                await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            }

            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms',
                width: 250,
                height: 250,
                crop: 'fill',
                gravity: 'face'
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
            }

            await fs.rm(`uploads/${req.file.filename}`);
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'User details updated successfully!!'
        });

    } catch (err) {
        return next(err);
    }
};

export {
    getProfile,
    login,
    logout,
    register,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
};

