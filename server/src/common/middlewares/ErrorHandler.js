'use strict';
const { ApplicationException } = require('../exceptions');
const { Logger } = require('../utils/Logger');
const { HttpStatusCodes } = require('../utils/httpStatusCodes');

class ErrorHandler {
    static #logger = new Logger(ErrorHandler.name);

    static errorHandler = async (err, req, res, next) => {
        ErrorHandler.#logger.error(`CAUGHT:===> ${err.stack}`);
        if (err instanceof ApplicationException) {
            return res.status(err.status).send({
                name: err.name,
                message: err.message,
                status: err.status,
            });
        } else {
            return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
                name: err.name,
                message: err.message,
                status: err.status,
            });
        }
    };

    static initializeUnhandledException = () => {
        process.on('unhandledRejection', (reason, promise) => {
            ErrorHandler.#logger.error(
                {
                    name: reason.name,
                    message: reason.message,
                },
                'UNHANDLED REJECTION! 💥 Shutting down...',
            );
            throw reason;
        });

        process.on('uncaughtException', err => {
            ErrorHandler.#logger.error(
                {
                    name: err.name,
                    message: err.message,
                },
                'UNCAUGHT EXCEPTION! 💥 Shutting down...',
            );

            process.exit(1);
        });
    };
}

module.exports = { ErrorHandler };
