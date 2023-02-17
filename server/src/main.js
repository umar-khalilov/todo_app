'use strict';
const { App } = require('./App');
const { AuthController } = require('./authentication/AuthController');
const { UserController } = require('./users/UserController');
const { ErrorHandler } = require('./common/middlewares/ErrorHandler');
const { Logger } = require('./common/utils/Logger');
const { validateEnv } = require('./common/utils/validateEnv');

const bootstrap = async () => {
    try {
        await validateEnv();
        const controllers = [new AuthController(), new UserController()];
        const app = new App(controllers);
        await app.listen();
    } catch (err) {
        new Logger(bootstrap.name).error(err);
        process.exit(1);
    }
};

void bootstrap();

ErrorHandler.initializeUnhandledException();
