import { put } from 'redux-saga/effects';
import { authController } from '../../api/http/authController';
import { authActions } from './authActions';
import { ruleAction } from '../../utils/ruleAction';

export const authSagas = Object.freeze({
    *signUpSaga(action = ruleAction) {
        try {
            const {
                payload: { authData },
            } = action;

            const {
                data: { data },
            } = yield authController.signUp(authData);

            yield put(authActions.authSignUpSuccess({ authData: data }));
        } catch (error) {
            yield put(authActions.authSignUpError({ error }));
        }
    },
    *signInSaga(action = ruleAction) {
        try {
            const {
                payload: { authData },
            } = action;

            const {
                data: { data },
            } = yield authController.signIn(authData);

            yield put(authActions.authSignUpRequest({ authData: data }));
        } catch (error) {
            yield put(authActions.authSignUpError({ error }));
        }
    },
});
