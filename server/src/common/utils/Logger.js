const { format, inspect } = require('node:util');

class Logger {
    #name;
    #DATETIME_LENGTH;
    #COLOURS;

    constructor(name = Logger.name) {
        this.#name = name;
        this.#DATETIME_LENGTH = 19;
        this.#COLOURS = {
            info: '\x1b[32m',
            debug: '\x1b[1;33m',
            error: '\x1b[0;31m',
            system: '\x1b[1;34m',
            access: '\x1b[1;38m',
        };
    }

    #output(type = 'info', msg) {
        const now = new Date().toISOString();
        const date = now.substring(0, this.#DATETIME_LENGTH);
        const colour = this.#COLOURS[type];
        const line = `${date}\t[${this.#name}] ${msg}`;
        if (type === 'error') {
            console.error(`${colour}${line}\x1b[0m`);
        }
        if (type === 'debug') {
            console.debug(`${colour}${line}\x1b[0m`);
        }
        console.log(`${colour}${line}\x1b[0m`);
    }

    log(...args) {
        const msg = format(...args);
        this.#output('info', msg);
    }

    dir(...args) {
        const msg = inspect(...args);
        this.#output('info', msg);
    }

    debug(...args) {
        const msg = format(...args);
        this.#output('debug', msg);
    }

    error(...args) {
        const msg = format(...args).replace(/[\n\r]{2,}/g, '\n');
        this.#output('error', msg.replace(this.regexp, ''));
    }

    system(...args) {
        const msg = format(...args);
        this.#output('system', msg);
    }

    access(...args) {
        const msg = format(...args);
        this.#output('access', msg);
    }
}

module.exports = { Logger };
