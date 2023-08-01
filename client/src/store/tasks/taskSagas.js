import { put } from 'redux-saga/effects';
import { ruleAction } from '../../utils/ruleAction';
import { taskActions } from './taskActions';
import { taskController } from '../../api/http/taskController';

export const taskSagas = Object.freeze({
    *createTaskSaga(action = ruleAction) {
        try {
            const {
                payload: { userId, task },
            } = action;
            const { data } = yield taskController.createTask({ userId, task });
            yield put(taskActions.createTaskSuccess({ task: data }));
        } catch (error) {
            yield put(taskActions.createTaskError({ error }));
        }
    },
    *getTasksSaga(action = ruleAction) {
        try {
            const {
                payload: { userId, page, limit, offset },
            } = action;
            const { data } = yield taskController.getTasks({ userId, page, limit, offset });
            yield put(taskActions.getTasksSuccess({ tasks: data }));
        } catch (error) {
            yield put(taskActions.getTasksError({ error }));
        }
    },
});
