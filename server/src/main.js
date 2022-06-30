import('dotenv/config');
import { validateEnv } from './utils/validateEnv.js';
import { App } from './App.js';

const bootstrap = async port => {
    try {
        await validateEnv();
        const controllers = [];
        const app = new App(controllers, port);
        app.listen();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

void bootstrap(+process.env.PORT);
