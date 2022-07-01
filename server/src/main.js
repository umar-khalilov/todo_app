require('dotenv').config();
const App = require('./App');
const UserController = require('./users/UserController');
const AuthController = require('./authentication/AuthController');
const TaskController = require('./tasks/TaskController');
const { validateEnv } = require('./utils/validateEnv');

const bootstrap = async port => {
    try {
        validateEnv();
        const controllers = [
            new UserController(),
            new AuthController(),
            new TaskController(),
        ];
        const app = new App(controllers, port);
        app.listen();
    } catch (err) {
        console.error('\x1b[31m', err, '\x1b[0m');
        process.exit(1);
    }
};

void bootstrap(process.env.PORT);
