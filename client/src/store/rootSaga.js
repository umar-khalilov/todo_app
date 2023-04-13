import { takeLatest } from 'redux-saga/effects';
import { ACTION_AUTH_TYPES } from './authentication/authTypes';
import { authSagas } from './authentication/authSagas';

export function* rootSaga() {
    yield takeLatest(ACTION_AUTH_TYPES.AUTH_SIGNUP_REQUEST, authSagas.signUpSaga);
    yield takeLatest(ACTION_AUTH_TYPES.AUTH_SIGNIN_REQUEST, authSagas.signInSaga);
}
