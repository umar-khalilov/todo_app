import { ApplicationException } from './ApplicationException.js';

export class UnauthorizedException extends ApplicationException {
    constructor(message = 'Wrong email or password') {
        super(message, 403);
    }
}
