import { authActions } from './authActions';
import { userActions } from './userActions';
import { tasksActions } from './tasksActions';

export const actions = {
    ...authActions,
    ...userActions,
    ...tasksActions,
};
