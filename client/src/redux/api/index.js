import axios from 'axios';
import { BASE_URL } from '../../config';
import { getListUserRequests } from './getListUserRequests';
import { getListAuthRequests } from './getListAuthRequests';
import { getListTaskRequests } from './getListTaskRequests';

const httpClient = axios.create({
    baseURL: `${BASE_URL}/api`,
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    timeout: 10000,
    responseType: 'json',
    responseEncoding: 'utf-8',
});

export const httpTodoProvider = {
    ...getListAuthRequests(httpClient),
    ...getListUserRequests(httpClient),
    ...getListTaskRequests(httpClient),
};
