export const getListAuthRequests = httpClient => ({
    authSignUp: async data => httpClient.post('/auth/sign-up', data),
});
