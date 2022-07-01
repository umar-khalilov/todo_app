import('dotenv/config');
import { UserController } from './users/UserController.js';
import { AuthController } from './authentication/AuthController.js';
import { TaskController } from './tasks/TaskController.js';
import { App } from './App.js';
import { validateEnv } from './utils/validateEnv.js';

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

void bootstrap(+process.env.PORT);
