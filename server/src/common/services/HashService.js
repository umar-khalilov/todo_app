const { createHash } = require('node:crypto');
const { hashPassword, validatePassword } = require('metautil');

class HashService {
    async hashPassword(password = '') {
        return hashPassword(password);
    }

    async checkIsMatch(plainValue = '', hashedValue = '') {
        return validatePassword(plainValue, hashedValue);
    }

    async hashValue(value = '') {
        const hash = createHash('sha256');
        hash.update(value);
        return hash.digest('hex');
    }
}

module.exports = { HashService };
