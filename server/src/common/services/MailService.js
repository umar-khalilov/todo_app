const { createTransport, getTestMessageUrl } = require('nodemailer');
const { configuration } = require('../../configs');
const { LoggerService } = require('../services/LoggerService');

class MailService {
    #logger;
    #config;
    #transport;

    constructor() {
        this.#logger = new LoggerService(MailService.name);
        this.#config = configuration;
        this.#transport = createTransport({
            host: this.#config.smtpHost,
            port: this.#config.smtpPort,
            secure: true,
            auth: {
                user: this.#config.smtpUsername,
                pass: this.#config.smtpPassword,
            },
        });
    }

    async #sendEmail(options = {}) {
        try {
            return this.#transport.sendMail(options);
        } catch (error) {
            this.#logger(error);
        }
    }

    async sendVerificationMail(email = '', link = '') {
        const message = {
            from: this.#config.smtpUsername,
            to: email,
            subject: 'Email confirmation',
            html: `<article><h1>To confirm the email address, please click here: </h1> <a href='${link}'>${link}</a></article>`,
            date: new Date().toUTCString(),
        };
        this.#sendEmail(message)
            .then(res => this.logger.log(getTestMessageUrl(res)))
            .catch(err => this.logger.error(err.message));
    }
}

module.exports = { MailService };
