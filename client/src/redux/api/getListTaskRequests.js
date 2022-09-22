export const getListTaskRequests = httpClient => ({
    createTask: async data => httpClient.post('/tasks', data),
    getAllTasks: async () => httpClient.get('/tasks'),
});
