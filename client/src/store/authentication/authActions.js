import { ACTION_AUTH_TYPES } from './authTypes';

export const authActions = Object.freeze({
    authSignUpRequest: ({ authData } = {}) => ({
        type: ACTION_AUTH_TYPES.AUTH_SIGNUP_REQUEST,
        payload: { authData },
    }),

    authSignUpSuccess: ({ authData } = {}) => ({
        type: ACTION_AUTH_TYPES.AUTH_SIGNUP_SUCCESS,
        payload: { authData },
    }),

    authSignUpError: ({ error } = {}) => ({
        type: ACTION_AUTH_TYPES.AUTH_SIGNUP_ERROR,
        payload: { error },
    }),

    authSignInRequest: ({ authData } = {}) => ({
        type: ACTION_AUTH_TYPES.AUTH_SIGNIN_REQUEST,
        payload: { authData },
    }),

    authSignInSuccess: ({ authData } = {}) => ({
        type: ACTION_AUTH_TYPES.AUTH_SIGNIN_SUCCESS,
        payload: { authData },
    }),

    authSignInError: ({ error } = {}) => ({
        type: ACTION_AUTH_TYPES.AUTH_SIGNIN_ERROR,
        payload: { error },
    }),
});
