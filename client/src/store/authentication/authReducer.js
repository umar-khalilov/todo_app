import produce from 'immer';
import { AUTH_TYPES } from './authTypes';
import { ruleAction } from '../../utils/ruleAction';

const initialState = {
    authData: {},
    isFetching: false,
    error: null,
};

const handlers = {
    [AUTH_TYPES.AUTH_SIGNUP_REQUEST]: produce((draft, action) => {
        const {
            payload: { authData },
        } = action;
        draft.authData = authData;
        draft.isFetching = true;
    }),
    [AUTH_TYPES.AUTH_SIGNUP_SUCCESS]: produce((draft, action) => {
        const {
            payload: { authData },
        } = action;
        draft.authData = authData;
        draft.isFetching = false;
    }),
    [AUTH_TYPES.AUTH_SIGNUP_ERROR]: produce((draft, action) => {
        const {
            payload: { error },
        } = action;
        draft.error = error;
        draft.isFetching = false;
    }),
    [AUTH_TYPES.AUTH_SIGNIN_REQUEST]: produce((draft, action) => {
        const {
            payload: { authData },
        } = action;
        draft.authData = authData;
        draft.isFetching = true;
    }),
    [AUTH_TYPES.AUTH_SIGNIN_SUCCESS]: produce((draft, action) => {
        const {
            payload: { authData },
        } = action;
        draft.authData = authData;
        draft.isFetching = false;
    }),
    [AUTH_TYPES.AUTH_SIGNIN_ERROR]: produce((draft, action) => {
        const {
            payload: { error },
        } = action;
        draft.error = error;
        draft.isFetching = false;
    }),
};

export const authReducer = (state = initialState, action = ruleAction) => {
    const { type } = action;
    if (handlers[type]) {
        return handlers[type](state, action);
    }
    return state;
};
