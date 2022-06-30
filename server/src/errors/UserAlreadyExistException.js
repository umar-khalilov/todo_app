import { ApplicationException } from './ApplicationException.js';

export class UserAlreadyExistException extends ApplicationException {
    constructor(message = 'User with this email already exist') {
        super(message, 406);
    }
}
