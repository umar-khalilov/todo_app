import produce from 'immer';
import { TASK_TYPES } from './taskTypes';
import { ruleAction } from '../../utils/ruleAction';

const initialState = {
    tasks: [],
    isFetching: false,
    error: null,
};

const handlers = {
    [TASK_TYPES.CREATE_TASK_REQUEST]: produce(draft => {
        draft.isFetching = true;
    }),
    [TASK_TYPES.CREATE_TASK_SUCCESS]: produce((draft, action) => {
        const {
            payload: { task },
        } = action;
        draft.tasks.push(task);
        draft.isFetching = false;
    }),
    [TASK_TYPES.CREATE_TASK_ERROR]: produce((draft, action) => {
        const {
            payload: { error },
        } = action;
        draft.error = error;
        draft.isFetching = false;
    }),
    [TASK_TYPES.GET_TASKS_REQUEST]: produce(draft => {
        draft.isFetching = true;
    }),
    [TASK_TYPES.GET_TASKS_SUCCESS]: produce((draft, action) => {
        const {
            payload: { tasks },
        } = action;
        draft.tasks.push(...tasks);
        draft.isFetching = false;
    }),
    [TASK_TYPES.GET_TASKS_ERROR]: produce((draft, action) => {
        const {
            payload: { error },
        } = action;
        draft.error = error;
        draft.isFetching = false;
    }),
};

export const taskReducer = (state = initialState, action = ruleAction) => {
    const { type } = action;
    if (handlers[type]) {
        return handlers[type](state, action);
    }
    return state;
};
