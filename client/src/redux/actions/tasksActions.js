import { ACTION_TASK_TYPES } from '../action-types/taskTypes';

export const tasksActions = {
    createTaskRequest: data => ({
        type: ACTION_TASK_TYPES.CREATE_TASK_REQUEST,
        data,
    }),
    createTaskSuccess: data => ({
        type: ACTION_TASK_TYPES.CREATE_TASK_SUCCESS,
        data,
    }),
    createTaskError: error => ({
        type: ACTION_TASK_TYPES.CREATE_TASK_ERROR,
        error,
    }),
    removeTask: id => ({
        type: ACTION_TASK_TYPES.DELETE_TASK_REQUEST,
        id,
    }),
};
