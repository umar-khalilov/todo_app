import { ApplicationException } from './ApplicationException.js';

export class UserNotFoundException extends ApplicationException {
    constructor(message = 'User not found') {
        super(message, 404);
    }
}
