class ApplicationException extends Error {
    constructor(
        message = 'Something went wrong. Please try again',
        status = 500,
    ) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApplicationException;
