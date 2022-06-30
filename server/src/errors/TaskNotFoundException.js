import { ApplicationException } from './ApplicationException.js';

export class TaskNotFoundException extends ApplicationException {
    constructor(message = 'Task not found') {
        super(message, 404);
    }
}
