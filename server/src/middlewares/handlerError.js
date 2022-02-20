module.exports.handlerError = async (err, req, res, next) => {
    console.error(`ERROR caught: ->>>>>${err}`);
    if (res.headersSent) {
        return;
    }
    const status = err.status || 500;
    const message = err.message || 'Server error';
    res.status(status).send({
        errors: err,
        message: message,
    });
};
