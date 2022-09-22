import { ACTION_AUTH_TYPES } from '../action-types/authTypes';

export const authActions = {
    authSignUpRequest({ user } = {}) {
        return {
            type: ACTION_AUTH_TYPES.SIGNUP_AUTH_REQUEST,
            payload: { user },
        };
    },

    authSignUpSuccess({ user } = {}) {
        return {
            type: ACTION_AUTH_TYPES.SIGNUP_AUTH_SUCCESS,
            payload: { user },
        };
    },

    authSignUpError({ error }) {
        return {
            type: ACTION_AUTH_TYPES.SIGNUP_AUTH_ERROR,
            payload: { error },
        };
    },
};
