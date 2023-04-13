import queryString from 'query-string';
import { HttpMethods } from '../utils/HttpMethods';

export class HttpProvider {
    #baseURL;
    #baseHeaders;

    constructor(baseURL = '', baseHeaders = {}) {
        this.#baseURL = baseURL;
        this.#baseHeaders = { 'Content-Type': 'application/json', ...baseHeaders };
    }

    async #handleResponse(response) {
        if (!response.ok) {
            return response.json().then(data => {
                return Promise.reject({
                    status: response.status,
                    ok: false,
                    message: response.message,
                    body: data,
                });
            });
        }
        return response.json();
    }

    async get({ restUrl = '', headers = {}, queryParams = null }) {
        const requestOptions = {
            method: HttpMethods.GET,
            headers: new Headers({ ...this.#baseHeaders, ...headers }),
        };

        if (queryParams) {
            const url = `${this.#baseURL}/${restUrl}?${queryString.stringify(queryParams)}`;
            return fetch(url, requestOptions).then(this.#handleResponse);
        }
        return fetch(`${this.#baseURL}/${restUrl}`, requestOptions).then(this.#handleResponse);
    }

    async post(restUrl = '', headers = {}, body = {}) {
        const requestOptions = {
            method: HttpMethods.POST,
            headers: new Headers({ ...this.#baseHeaders, ...headers }),
            body: JSON.stringify(body),
        };
        return fetch(`${this.#baseURL}/${restUrl}`, requestOptions).then(this.#handleResponse);
    }

    async put(restUrl = '', headers = {}, body = {}) {
        const requestOptions = {
            method: HttpMethods.PUT,
            headers: new Headers({ ...this.#baseHeaders, ...headers }),
            body: JSON.stringify(body),
        };
        return fetch(`${this.#baseURL}/${restUrl}`, requestOptions).then(this.#handleResponse);
    }

    async patch(restUrl = '', headers = {}, body = {}) {
        const requestOptions = {
            method: HttpMethods.PATCH,
            headers: new Headers({ ...this.#baseHeaders, ...headers }),
            body: JSON.stringify(body),
        };
        return fetch(`${this.#baseURL}/${restUrl}`, requestOptions).then(this.#handleResponse);
    }

    async delete(restUrl = '', headers = {}) {
        const requestOptions = {
            method: HttpMethods.DELETE,
            headers: new Headers({ ...this.#baseHeaders, ...headers }),
        };
        return fetch(`${this.#baseURL}/${restUrl}`, requestOptions).then(this.#handleResponse);
    }
}
