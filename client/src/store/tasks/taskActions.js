import { TASK_TYPES } from './taskTypes';

export const taskActions = Object.freeze({
    createTaskRequest: ({ task }) => ({
        type: TASK_TYPES.CREATE_TASK_REQUEST,
        payload: { task },
    }),
    createTaskSuccess: ({ task }) => ({
        type: TASK_TYPES.CREATE_TASK_SUCCESS,
        payload: { task },
    }),
    createTaskError: ({ error }) => ({
        type: TASK_TYPES.CREATE_TASK_ERROR,
        payload: { error },
    }),
    getTaskRequest: ({ taskId }) => ({
        type: TASK_TYPES.GET_TASK_REQUEST,
        payload: { taskId },
    }),
    getTaskSuccess: ({ task }) => ({
        type: TASK_TYPES.GET_TASKS_SUCCESS,
        payload: { task },
    }),
    getTaskError: ({ error }) => ({
        type: TASK_TYPES.GET_TASK_ERROR,
        payload: { error },
    }),
    getTasksRequest: ({ page, limit, offset } = {}) => ({
        type: TASK_TYPES.GET_TASKS_REQUEST,
        payload: { page, limit, offset },
    }),
    getTasksSuccess: ({ tasks = [] } = {}) => ({
        type: TASK_TYPES.GET_TASKS_SUCCESS,
        payload: { tasks },
    }),
    getTasksError: ({ error }) => ({
        type: TASK_TYPES.GET_TASKS_ERROR,
        payload: { error },
    }),
});
