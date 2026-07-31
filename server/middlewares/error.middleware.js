const errorMiddleware = (err, req, res, next) => {
    console.error("ERROR:", err); // ← ye line add karo

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Something went wrong!!";
    
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack
    })
}

export default errorMiddleware;