import { ApplicationException } from './ApplicationException.js';

export class ServerException extends ApplicationException {
    constructor(message = 'Server error') {
        super(message, 500);
    }
}
