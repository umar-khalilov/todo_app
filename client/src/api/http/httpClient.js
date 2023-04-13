import { BASE_URL } from '../../config';
import { HttpProvider } from '../../services/HttpProvider';

const headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };

export const httpClient = new HttpProvider(`${BASE_URL}/api`, headers);
