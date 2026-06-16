import jwt from 'jsonwebtoken';
import AppError from '../utils/error.util.js';


const isLoggedIn = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return next(new AppError('Unauthenticated, please login again', 401));
        }

        const userDetails = jwt.verify(token, process.env.JWT_SECRET);

        req.user = userDetails;

        next();

    } catch (error) {
        return next(new AppError('Invalid or expired token', 401));
    }
};

const authorizedRoles = (...roles) => async (req, res, next) => {
    const currentUserRole = req.user.role;

    if(!roles.includes(currentUserRole)) {
        return next(
            AppError('You do not have permission to access this route')
        )
    }
    next();
}

export {
    isLoggedIn,
    authorizedRoles
}