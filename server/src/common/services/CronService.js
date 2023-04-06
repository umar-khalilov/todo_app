const { LoggerService } = require('./LoggerService');
const {
    RefreshTokenService,
} = require('../../refreshTokens/RefreshTokenService');
const schedule = require('node-schedule');

class CronService {
    #refreshTokenService;
    #cron;
    #logger;

    constructor() {
        this.#logger = new LoggerService(CronService.name);
        this.#refreshTokenService = new RefreshTokenService();
        this.#cron = schedule;
    }

    /**
     * Running EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT
     */
    removeExpiredTokens() {
        this.#cron.scheduleJob('Removing tokens', '0 0 0 1 * *', async () => {
            const results =
                await this.#refreshTokenService.removeExpiredTokens();
            this.#logger.debug(`${results || 0} tokens was deleted`);
        });
    }

    gracefullyShutdown() {
        process.on('SIGINT', () => {
            this.#cron.gracefulShutdown().then(() => process.exit(0));
        });
    }
}

module.exports = { CronService };
