import produce from 'immer';
import { USER_TYPES } from './userTypes';
import { ruleAction } from '../../utils/ruleAction';

const initialState = {
    user: {},
    isFetching: false,
    error: null,
};

const handlers = {
    [USER_TYPES.GET_USER_REQUEST]: produce(draft => {
        draft.isFetching = true;
    }),
    [USER_TYPES.GET_USER_SUCCESS]: produce((draft, action) => {
        const {
            payload: { user },
        } = action;
        draft.user = user;
        draft.isFetching = false;
    }),
    [USER_TYPES.GET_USER_ERROR]: produce((draft, action) => {
        const {
            payload: { error },
        } = action;
        draft.error = error;
        draft.isFetching = false;
    }),
};

export const userReducer = (state = initialState, action = ruleAction) => {
    const { type } = action;
    if (handlers[type]) {
        return handlers[type](state, action);
    }
    return state;
};
