
const error = (err, req, res, next) => {


    // Validation error
    if (err.name === "ValidationError") {
        err.statusCode = 400,
            err.message = Object.values(err.errors).map((ele) => ele.message)

    }


    err.message = err.message,
        err.statusCode = err.statusCode || 500


    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        obj: err
    })
}


export { error}