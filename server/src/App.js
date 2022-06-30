import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { errorHandler } from './middlewares/errorHandler.js';

export class App {
    #app;
    #port;

    constructor(controllers = [], port = 4000) {
        this.#app = express();
        this.#port = port;
        this.#initializeMiddlewares();
        this.#initializeControllers(controllers);
        this.#initializeErrorHandling();
    }

    listen() {
        createServer(this.#app).listen(this.#port, () =>
            console.info(
                '\x1b[1m',
                '\x1b[32m',
                `Express App started on http://localhost:${this.#port}`,
                '\x1b[0m',
            ),
        );
    }

    #initializeMiddlewares() {
        this.#app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header(
                'Access-Control-Allow-Methods',
                'GET,POST,DELETE,OPTIONS,PUT',
            );
            res.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.#app.use(cors());
        this.#app.use(compression());
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
    }

    #initializeErrorHandling() {
        this.#app.use(errorHandler);
    }

    #initializeControllers(controllers = []) {
        controllers.forEach(controller =>
            this.#app.use('/api', controller.router),
        );
    }
}
