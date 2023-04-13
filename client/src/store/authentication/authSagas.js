import { put } from 'redux-saga/effects';
import { authController } from '../../api/http/authController';

export const authSagas = {
    *signUpSaga(action = {}) {
        try {
            const {
                data: { data: authData },
            } = yield authController.signUp(action.payload);
            yield put(action.authSignUpRequest({ authData }));
        } catch (error) {
            yield put(action.authSignUpError({ error }));
        }
    },
    *signInSaga(action = {}) {
        try {
            const {
                data: { data: authData },
            } = yield authController.signIn(action.payload);
            yield put(action.authSignUpRequest({ authData }));
        } catch (error) {
            yield put(action.authSignUpError({ error }));
        }
    },
};
