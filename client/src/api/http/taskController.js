import { httpClient } from './httpClient';

export const taskController = Object.freeze({
    httpClient: httpClient,
    async createTask({ userId, task }) {
        return this.httpClient.post(`users/${userId}/tasks`, {}, task);
    },
    async getTasks({ userId, page, limit, offset }) {
        return this.httpClient.get(`users/${userId}/tasks`, {}, { page, limit, offset });
    },
});
