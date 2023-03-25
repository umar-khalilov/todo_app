const { hashPassword, validatePassword } = require('metautil');

class HashService {
    async hashPassword(password = '') {
        return hashPassword(password);
    }

    async checkIsMatch(plainPassword = '', hashedPassword = '') {
        return validatePassword(plainPassword, hashedPassword);
    }

    async hashValue(value = '') {
        return hashPassword(value);
    }
}

module.exports = { HashService };
