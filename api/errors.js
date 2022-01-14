// Create custom errors
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const sendErrorRes = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
}

const logError = (err, req, res, next) => {
    console.error('\x1b[31m', err) // adding some color to our logs
    next(new AppError(err.message, err.statusCode))
}

// Catch errors from async functions and pass them along to sendErrorRes middleware
const catchAsyncErrors = fn => (req, res, next) => fn(req, res, next).catch(next);


module.exports = {
    AppError,
    sendErrorRes,
    logError,
    catchAsyncErrors
};