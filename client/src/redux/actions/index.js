import { ACTION_AUTH_TYPES } from './authTypes';
import { ACTION_USER_TYPES } from './userTypes';

export class Actions {
    static authSignUpRequest({ user } = {}) {
        return {
            type: ACTION_AUTH_TYPES.SIGNUP_AUTH_REQUEST,
            payload: { user },
        };
    }

    static authSignUpSuccess({ user } = {}) {
        return {
            type: ACTION_AUTH_TYPES.SIGNUP_AUTH_SUCCESS,
            payload: { user },
        };
    }

    static authSignUpError({ error }) {
        return {
            type: ACTION_AUTH_TYPES.SIGNUP_AUTH_ERROR,
            payload: { error },
        };
    }

    static getUsersRequest({ page, limit } = {}) {
        return {
            type: ACTION_USER_TYPES.GET_USERS_REQUEST,
            payload: { page, limit },
        };
    }

    static getUsersSuccess({ users } = {}) {
        return {
            type: ACTION_USER_TYPES.GET_USERS_SUCCESS,
            payload: { users },
        };
    }

    static getUsersError({ error }) {
        return {
            type: ACTION_USER_TYPES.GET_USERS_ERROR,
            payload: { error },
        };
    }

    static deleteUserRequest({ id } = {}) {
        return {
            type: ACTION_USER_TYPES.DELETE_USER_REQUEST,
            payload: { id },
        };
    }

    static deleteUserSuccess({ id } = {}) {
        return {
            type: ACTION_USER_TYPES.DELETE_USER_SUCCESS,
            payload: { id },
        };
    }

    static deleteUserError({ error } = {}) {
        return {
            type: ACTION_USER_TYPES.DELETE_USER_ERROR,
            payload: { error },
        };
    }

    static clearUserError() {
        return {
            type: ACTION_USER_TYPES.CLEAR_USER_ERROR,
        };
    }
}
