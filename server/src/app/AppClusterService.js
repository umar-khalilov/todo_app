const { cpus } = require('node:os');
const cluster = require('node:cluster');
const { Logger } = require('../common/utils/Logger');

class AppClusterService {
    static #numberOfCores = cpus().length;
    static #logger = new Logger(AppClusterService.name);

    static runInCluster(callback) {
        if (cluster.isPrimary) {
            AppClusterService.#logger.log(
                `Primary server started on: ${process.pid}`,
            );
            for (let i = 0; i < AppClusterService.#numberOfCores; i++) {
                cluster.fork();
            }
            cluster.on('exit', (worker, code, signal) => {
                AppClusterService.#logger.warn(
                    `Worker: ${worker.process.pid} died with code: ${code} and signal: ${signal}. Restarting`,
                );
                cluster.fork();
            });
        } else {
            AppClusterService.#logger.log(
                `Cluster server started on: ${process.pid}`,
            );
            void callback();
        }
    }
}

module.exports = { AppClusterService };
