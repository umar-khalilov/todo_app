const schedule = require('node-schedule');
const {
    RefreshTokenService,
} = require('../../refreshTokens/RefreshTokenService');
const { LoggerService } = require('./LoggerService');
const { CronExpression } = require('../utils/CronExpression');

class CronService {
    #refreshTokenService;
    #cron;
    #logger;

    constructor() {
        this.#logger = new LoggerService(CronService.name);
        this.#refreshTokenService = new RefreshTokenService();
        this.#cron = schedule;
        this.#logger.log('Initialized');
    }

    initialize() {
        this.#cron.scheduleJob(
            'Removing tokens',
            CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT,
            () => this.#removeExpiredTokens(),
        );

        process.on('SIGINT', () => {
            this.#cron.gracefulShutdown().then(() => process.exit(0));
        });
    }

    /**
     * Running EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT
     */
    async #removeExpiredTokens() {
        const results = await this.#refreshTokenService.removeExpiredTokens();
        this.#logger.system(`${results || 0} tokens was deleted`);
    }
}

module.exports = { CronService };
