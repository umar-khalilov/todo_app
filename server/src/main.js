'use strict';
const App = require('./App');
const UserController = require('./users/UserController');
const AuthController = require('./authentication/AuthController');
const TaskController = require('./tasks/TaskController');
const ErrorHandler = require('./common/middlewares/ErrorHandler');
const Logger = require('./common/utils/Logger');
const db = require('./app/database/models');
const { validateEnv } = require('./common/utils/validateEnv');
const { connectToDatabase } = require('./common/utils/connectToDatabase');

const bootstrap = async () => {
    try {
        await validateEnv();
        await connectToDatabase(db);
        const controllers = [
            new UserController(),
            new AuthController(),
            new TaskController(),
        ];
        const app = new App(controllers);
        await app.listen();
    } catch (err) {
        new Logger(bootstrap.name).error(err);
        process.exit(1);
    }
};

void bootstrap();

ErrorHandler.initializeUnhandledException();
