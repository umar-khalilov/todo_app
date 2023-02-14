class Logger {
    #name;
    #date;

    constructor(name = '') {
        this.#name = name;
        this.#date = new Date();
    }

    log(...args) {
        args.forEach(arg => {
            console.log(
                `\x1b[1m\x1b[32m${this.#date.toISOString()} LOG: ${
                    this.#name
                } - ${arg}\x1b[0m`,
            );
        });
    }

    error(...args) {
        args.forEach(arg => {
            console.error(
                `\x1b[31m${this.#date.toISOString()} ERROR: ${
                    this.#name
                } - ${arg}\x1b[0m`,
            );
        });
    }
}

module.exports = { Logger };
