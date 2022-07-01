const { createServer } = require('http');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const { errorHandler } = require('./middlewares/errorHandler');

class App {
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
        createServer(this.#app).listen(Number(this.#port), () =>
            console.info(
                '\x1b[1m',
                '\x1b[32m',
                `Express App started on http://localhost:${this.#port}`,
                '\x1b[0m',
            ),
        );
    }

    #initializeMiddlewares() {
        this.#app.all((req, res, next) => {
            res.setHeader(
                'Access-Control-Allow-Headers',
                'X-Requested-With, Content-Type, Authorization, Accept',
            );
            res.header('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.header(
                'Access-Control-Allow-Methods',
                'GET,POST,DELETE,PUT,PATCH',
            );
            res.header('Access-Control-Max-Age', '3600');
            next();
        });
        this.#app.use(cors({ origin: 'http://localhost:3000' }));
        this.#app.use(compression());
        this.#app.use(express.json({ limit: '100mb' }));
        this.#app.use(express.urlencoded({ limit: '50mb', extended: true }));
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

module.exports = App;
