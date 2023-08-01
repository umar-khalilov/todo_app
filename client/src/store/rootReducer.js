import { combineReducers } from 'redux';
import { authReducer } from './authentication/authReducer';
import { userReducer } from './users/userReducer';
import { taskReducer } from './tasks/taskReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    task: taskReducer,
});
