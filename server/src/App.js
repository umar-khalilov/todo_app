const { createServer } = require('http');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const { sequelize } = require('./app/database/models');
const { LoggerService } = require('./common/services/LoggerService');
const { ErrorHandler } = require('./common/middlewares/ErrorHandler');
const { docs } = require('./app/docs');
const { configuration } = require('./configs');
const { NotFoundException } = require('./common/exceptions');
const { CronService } = require('./common/services/CronService');

class App {
    #app;
    #port;
    #logger;
    #server;
    #cronService;

    constructor(controllers = []) {
        this.#app = express();
        this.#port = configuration.serverPort;
        this.#logger = new LoggerService(App.name);
        this.#connectToTheDatabase();
        this.#initializeMiddlewares();
        this.#initializeControllers(controllers);
        this.#initializeErrorHandling();
        this.#server = createServer(this.#app);
        this.#cronService = new CronService();
        this.#gracefullyClose();
    }

    #connectToTheDatabase() {
        sequelize
            .authenticate()
            .then(_ => {
                this.#logger.log(
                    'Connection to the database has been established successfully!',
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
        controllers.forEach(controller => {
            this.#app.use('/api', controller.router);
        });
    }

    #initializeErrorHandling() {
        this.#app.use('*', (req, res, next) => {
            next(
                new NotFoundException(
                    `The requested path: ${req.path} not found`,
                ),
            );
        });
        this.#app.use(ErrorHandler.errorHandler);
    }

    async listen() {
        this.#server.listen(this.#port);
        this.#server.on('listening', () => {
            this.#logger.log('Application started!');
            this.#logger.log(
                `Application documentation is available at http://localhost:${
                    this.#port
                }/api/docs`,
            );
            this.#cronService.removeExpiredTokens();
            this.#cronService.gracefullyShutdown();
        });
    }

    #gracefullyClose() {
        process.once('SIGTERM', () => {
            this.#logger.log('SIGTERM signal received.');
            this.#logger.log('Closing http server.');
            this.#server.close(async () => {
                this.#logger.log('Http server closed.');
                await sequelize.close();
                process.exit(0);
            });
        });
    }
}

module.exports = { App };
