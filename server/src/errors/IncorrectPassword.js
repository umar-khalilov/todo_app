import { ApplicationException } from './ApplicationException.js';

export class IncorrectException extends ApplicationException {
    constructor(message = 'Incorrect password') {
        super(message, 406);
    }
}
