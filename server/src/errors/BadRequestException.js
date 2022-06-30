import { ApplicationException } from './ApplicationException.js';

export class BadRequestException extends ApplicationException {
    constructor(message = 'Bad request') {
        super(message, 400);
    }
}
