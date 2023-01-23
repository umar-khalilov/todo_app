import { ACTION_USER_TYPES } from '../action-types/userTypes';

export const userActions = {
    getUsersRequest: ({ page, limit } = {}) => ({
        type: ACTION_USER_TYPES.GET_USERS_REQUEST,
        payload: { page, limit },
    }),

    getUsersSuccess: ({ users } = {}) => ({
        type: ACTION_USER_TYPES.GET_USERS_SUCCESS,
        payload: { users },
    }),

    getUsersError: ({ error }) => ({
        type: ACTION_USER_TYPES.GET_USERS_ERROR,
        payload: { error },
    }),

    updateUserRequest: ({ userData, userId = 0 }) => ({
        type: ACTION_USER_TYPES.UPDATE_USER_REQUEST,
        payload: { userData, userId },
    }),

    updateUserSuccess: ({ userData, userId }) => ({
        type: ACTION_USER_TYPES.UPDATE_USER_SUCCESS,
        payload: { userData, userId },
    }),

    updateUserError: ({ error }) => ({
        type: ACTION_USER_TYPES.UPDATE_USER_ERROR,
        payload: { error },
    }),

    deleteUserRequest: (id = 0) => ({
        type: ACTION_USER_TYPES.DELETE_USER_REQUEST,
        payload: { id },
    }),

    deleteUserSuccess: (id = 0) => ({
        type: ACTION_USER_TYPES.DELETE_USER_SUCCESS,
        payload: { id },
    }),

    deleteUserError: ({ error } = {}) => ({
        type: ACTION_USER_TYPES.DELETE_USER_ERROR,
        payload: { error },
    }),

    clearUserError: () => ({
        type: ACTION_USER_TYPES.CLEAR_USER_ERROR,
    }),
};
