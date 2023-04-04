const { createTransport } = require('nodemailer');
const { LoggerService } = require('../services/LoggerService');
const { configuration } = require('../../configs');

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
            secure: false,
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
            this.#logger.error(error.message);
        }
    }

    async sendVerificationMail(email = '', link = '') {
        const message = {
            from: this.#config.smtpUsername,
            to: email,
            subject: 'Email verification',
            html: `<article><h1>To verificate the email address, please click here: </h1> <a href='${link}'>${link}</a></article>`,
            date: new Date().toUTCString(),
        };
        this.#sendEmail(message);
    }
}

module.exports = { MailService };
