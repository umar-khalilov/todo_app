import { httpClient } from './httpClient';

export const authController = Object.freeze({
    httpClient: httpClient,
    async signUp(data) {
        return this.httpClient.post('auth/sign-up', {}, data);
    },
    async signIn(data) {
        return this.httpClient.post('auth/sign-in', {}, data);
    },
});
