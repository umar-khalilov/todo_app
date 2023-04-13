import { produce } from 'immer';
import { ACTION_AUTH_TYPES } from './authTypes';

const initialState = {
    authData: {},
    isFetching: false,
    error: null,
};

const handlers = {
    [ACTION_AUTH_TYPES.AUTH_SIGNUP_REQUEST]: produce((draft, action) => {
        const {
            payload: { authData },
        } = action;
        draft.authData = authData;
        draft.isFetching = true;
    }),

    [ACTION_AUTH_TYPES.AUTH_SIGNUP_SUCCESS]: produce((draft, action) => {
        const {
            payload: { authData },
        } = action;
        draft.authData = authData;
        draft.isFetching = false;
    }),

    [ACTION_AUTH_TYPES.AUTH_SIGNUP_ERROR]: produce((draft, action) => {
        const {
            payload: { error },
        } = action;
        draft.error = error;
        draft.isFetching = false;
    }),

    [ACTION_AUTH_TYPES.AUTH_SIGNIN_REQUEST]: produce((draft, action) => {
        const {
            payload: { authData },
        } = action;
        draft.authData = authData;
        draft.isFetching = true;
    }),

    [ACTION_AUTH_TYPES.AUTH_SIGNIN_SUCCESS]: produce((draft, action) => {
        const {
            payload: { authData },
        } = action;
        draft.authData = authData;
        draft.isFetching = false;
    }),

    [ACTION_AUTH_TYPES.AUTH_SIGNIN_ERROR]: produce((draft, action) => {
        const {
            payload: { error },
        } = action;
        draft.error = error;
        draft.isFetching = false;
    }),
};

export const authReducer = (state = initialState, action = {}) => {
    const { type } = action;
    if (handlers[type]) {
        return handlers[type](state, action);
    }
    return state;
};
