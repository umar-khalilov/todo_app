'use strict';
const { App } = require('./App');
const { AppClusterService } = require('./app/AppClusterService');
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

// To run the application on all processor cores, comment bootstrap function
// and uncomment the following line
// AppClusterService.runInCluster(bootstrap);
ErrorHandler.initializeUnhandledException();
