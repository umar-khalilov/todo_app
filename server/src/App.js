const { createServer } = require('http');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const { sequelize } = require('./app/database/models');
const { Logger } = require('./common/utils/Logger');
const { ErrorHandler } = require('./common/middlewares/ErrorHandler');
const { PathNotFoundException } = require('./common/exceptions');
const { docs } = require('./app/docs');
const { configuration } = require('./configs');

class App {
    #app;
    #port;
    #logger;

    constructor(controllers = []) {
        this.#app = express();
        this.#port = configuration.serverPort;
        this.#logger = new Logger(App.name);
        this.#connectToTheDatabase();
        this.#initializeMiddlewares();
        this.#initializeControllers(controllers);
        this.#initializeErrorHandling();
    }

    #connectToTheDatabase() {
        sequelize
            .authenticate()
            .then(_ => {
                this.#logger.log(
                    'Connection to database has been established successfully!',
                );
            })
            .catch(error => {
                this.#logger.error(
                    `Unable to connect to the database: ${error}`,
                );
            });
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
        this.#app.use(cors());
        this.#app.use(compression());
        this.#app.use(express.json({ limit: '100mb' }));
        this.#app.use(express.urlencoded({ limit: '50mb', extended: true }));
        this.#app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(docs));
    }

    #initializeControllers(controllers = []) {
        controllers.forEach(controller =>
            this.#app.use('/api', controller.router),
        );
    }

    #initializeErrorHandling() {
        this.#app.use('*', (req, res, next) =>
            next(new PathNotFoundException(req.path)),
        );
        this.#app.use(ErrorHandler.errorHandler);
    }

    async listen() {
        const server = createServer(this.#app);
        server.listen(this.#port);
        server.on('listening', () => {
            this.#logger.log(
                'Express application started!',
                `Application documentation is available at http://localhost:${
                    this.#port
                }/api/docs`,
            );
        });

        process.on('SIGTERM', () => {
            this.#logger.log('SIGTERM received');
            server.close();
        });
    }
}

module.exports = { App };
