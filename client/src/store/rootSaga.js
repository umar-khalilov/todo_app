import { takeLatest } from 'redux-saga/effects';
import { AUTH_TYPES } from './authentication/authTypes';
import { USER_TYPES } from './users/userTypes';
import { TASK_TYPES } from './tasks/taskTypes';
import { authSagas } from './authentication/authSagas';
import { userSagas } from './users/userSagas';
import { taskSagas } from './tasks/taskSagas';

export function* rootSaga() {
    yield takeLatest(AUTH_TYPES.AUTH_SIGNUP_REQUEST, authSagas.signUpSaga);
    yield takeLatest(AUTH_TYPES.AUTH_SIGNIN_REQUEST, authSagas.signInSaga);
    yield takeLatest(USER_TYPES.GET_USER_REQUEST, userSagas.getUserSaga);
    yield takeLatest(TASK_TYPES.CREATE_TASK_REQUEST, taskSagas.createTaskSaga);
    yield takeLatest(TASK_TYPES.GET_TASKS_REQUEST, taskSagas.getTasksSaga);
}
