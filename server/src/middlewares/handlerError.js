const ApplicationError = require('../errors/ApplicationError');

module.exports.handlerError = async (err, req, res, next) => {
    console.error('\x1b[31m', `ERROR caught:->>>>> ${err.stack}`);
    if (err instanceof ApplicationError) {
        return res
            .status(err.status)
            .send({ name: err.name, message: err.message });
    } else {
        return res.status(500).send('Server Error');
    }
};
