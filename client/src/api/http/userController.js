import { httpClient } from './httpClient';

export const userController = Object.freeze({
    httpClient: httpClient,
    async getUser(userId = 0) {
        return this.httpClient.get(`users/${userId}`);
    },
    async updateUser(userId = 0, data = {}) {
        return this.httpClient.patch(`users/${userId}`, {}, data);
    },
});
