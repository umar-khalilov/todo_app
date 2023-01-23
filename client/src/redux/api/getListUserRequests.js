import queryString from 'query-string';

export const getListUserRequests = httpClient => ({
    getAllUsers: async ({ page = 1, limit = 10 }) =>
        httpClient.get(`/users?${queryString.stringify({ page, limit })}`),
});
