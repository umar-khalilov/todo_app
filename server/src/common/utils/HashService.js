const { hash, genSalt, compare } = require('bcryptjs');
const { configuration } = require('../../configs');
module.exports = class HashService {
    #saltRounds;

    constructor() {
        this.#saltRounds = configuration.saltRounds;
    }

    async hashPassword(password) {
        const salt = await genSalt(this.#saltRounds);
        return hash(password, salt);
    }

    async checkIsMatch(plainPassword, hashedPassword) {
        return compare(plainPassword, hashedPassword);
    }
};
