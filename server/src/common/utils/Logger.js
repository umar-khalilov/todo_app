class Logger {
    #name;
    #date;

    constructor(name = Logger.name) {
        this.#name = name;
        this.#date = new Date();
    }

    log(value, ...args) {
        console.log(
            `\x1b[1m\x1b[32m${this.#date.toISOString()} LOG: ${
                this.#name
            } - ${value}\x1b[0m`,
        );
        if (args.length) {
            args.forEach(arg => {
                console.log(
                    `\x1b[1m\x1b[32m${this.#date.toISOString()} LOG: ${
                        this.#name
                    } - ${arg}\x1b[0m`,
                );
            });
        }
    }

    error(value, ...args) {
        console.error(
            `\x1b[31m${this.#date.toISOString()} ERROR: ${
                this.#name
            } - ${value}\x1b[0m`,
        );
        if (args.length) {
            args.forEach(arg => {
                console.error(
                    `\x1b[31m${this.#date.toISOString()} ERROR: ${
                        this.#name
                    } - ${arg}\x1b[0m`,
                );
            });
        }
    }
}

module.exports = { Logger };
