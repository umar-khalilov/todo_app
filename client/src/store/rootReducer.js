import { combineReducers } from 'redux';
import { authReducer } from './authentication/authReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
});
