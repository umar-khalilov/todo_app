import { takeLatest } from 'redux-saga/effects';
import { ACTION_USER_TYPES } from '../actions/userTypes';
import { getUsersSaga } from './userSagas';

export function* rootSaga() {
    yield takeLatest(ACTION_USER_TYPES.GET_USERS_REQUEST, getUsersSaga);
}