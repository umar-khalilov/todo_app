import produce from 'immer';
import { ACTION_USER_TYPES } from '../actions/userTypes';

const initialState = {
    users: [],
    isFetching: false,
    error: null,
};

const handlers = {
    [ACTION_USER_TYPES.GET_USERS_REQUEST]: produce(draft => {
        draft.isFetching = true;
    }),

    [ACTION_USER_TYPES.GET_USERS_SUCCESS]: produce((draft, action) => {
        const {
            payload: { users },
        } = action;
        draft.users.push(...users);
        draft.isFetching = false;
    }),

    [ACTION_USER_TYPES.GET_USERS_ERROR]: produce((draft, action) => {
        const {
            payload: { error },
        } = action;
        draft.error = error;
        draft.isFetching = false;
    }),
};

export const userReducer = (state = initialState, action) => {
    const { type } = action;
    if (handlers[type]) {
        return handlers[type](state, action);
    }
    return state;
};
