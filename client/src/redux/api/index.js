import axios from 'axios';
import { BASE_URL } from '../../config';

const http = axios.create({
    baseURL: `${BASE_URL}/api`,
});

export const authSignUp = body => http.post('/auth/sign-up', body);

export const getUsers = (page=1,limit=10)=> http.get(`/users?page=${page}&limit=${limit}`)