'use strict';
const { App } = require('./App');
const { AppClusterizeService } = require('./app/AppClusterizeService');
const { AuthController } = require('./authentication/AuthController');
const { UserController } = require('./users/UserController');
const { ErrorHandler } = require('./common/middlewares/ErrorHandler');
const { LoggerService } = require('./common/services/LoggerService');
const { validateEnv } = require('./common/utils/validateEnv');
const { RoleController } = require('./roles/RoleController');

const bootstrap = async () => {
    try {
        await validateEnv();
        const controllers = [
            new AuthController(),
            new UserController(),
            new RoleController(),
        ];
        const app = new App(controllers);
        await app.listen();
    } catch (err) {
        new LoggerService(bootstrap.name).error(err);
        process.exit(1);
    }
};

AppClusterizeService.runInCluster(bootstrap);

ErrorHandler.initializeUnhandledException();
