import { USER_TYPES } from './userTypes';

export const userActions = Object.freeze({
    getUserRequest: ({ userId }) => ({
        type: USER_TYPES.GET_USER_REQUEST,
        payload: { userId },
    }),
    getUserSuccess: ({ user }) => ({
        type: USER_TYPES.GET_USER_SUCCESS,
        payload: { user },
    }),
    getUserError: ({ error }) => ({
        type: USER_TYPES.GET_USER_ERROR,
        payload: { error },
    }),
    updateUserRequest: ({ userId, userData }) => ({
        type: USER_TYPES.UPDATE_USER_REQUEST,
        payload: { userId, userData },
    }),
    updateUserSuccess: ({ user }) => ({
        type: USER_TYPES.UPDATE_USER_SUCCESS,
        payload: { user },
    }),
    updateUserError: ({ error }) => ({
        type: USER_TYPES.UPDATE_USER_ERROR,
        payload: { error },
    }),
    deleteUserRequest: ({ userId }) => ({
        type: USER_TYPES.DELETE_USER_REQUEST,
        payload: { userId },
    }),
    deleteUserSuccess: ({ userId }) => ({
        type: USER_TYPES.DELETE_USER_SUCCESS,
        payload: { userId },
    }),
    deleteUserError: ({ error }) => ({
        type: USER_TYPES.DELETE_USER_ERROR,
        payload: { error },
    }),
    clearUserError: () => ({
        type: USER_TYPES.CLEAR_USER_ERROR,
        payload: { error: null },
    }),
});
