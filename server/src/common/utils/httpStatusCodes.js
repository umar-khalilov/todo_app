'use strict';

const HttpStatusCodes = Object.freeze({
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
    CONFLICT: 409,
    AUTHENTICATION_TIMEOUT: 419,
    INTERNAL_SERVER_ERROR: 500,
});

module.exports = { HttpStatusCodes };
