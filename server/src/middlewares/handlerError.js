module.exports.handlerError = (err, req, res, next) => {
    console.error(`ERROR caught:->>>>> ${err}`);
    if (err.message || err.status) {
        res.status(err.status).send(err.message);
    } else {
        res.status(500).send('Server Error');
    }
};
