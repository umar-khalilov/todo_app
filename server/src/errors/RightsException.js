import { ApplicationException } from './ApplicationException.js';

export class RightsException extends ApplicationException {
    constructor(message = 'Not enough rights') {
        super(message, 403);
    }
}
