import { ApplicationException } from './ApplicationException.js';

export class TokenException extends ApplicationException {
    constructor(message = 'Token error') {
        super(message, 419);
    }
}
