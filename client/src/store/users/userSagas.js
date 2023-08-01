import { put } from 'redux-saga/effects';
import { userController } from '../../api/http/userController';
import { userActions } from './userActions';
import { ruleAction } from '../../utils/ruleAction';

export const userSagas = Object.freeze({
    *getUserSaga(action = ruleAction) {
        try {
            const {
                payload: { userId },
            } = action;

            const { data: user } = yield userController.getUser(userId);

            yield put(userActions.getUserSuccess({ user }));
        } catch (error) {
            yield put(userActions.getUserError({ error }));
        }
    },
    *updateUserSaga(action = ruleAction) {
        try {
            const {
                payload: { userId, userData },
            } = action;
            const { data: user } = yield userController.updateUser(userId, userData);
            yield put(userActions.updateUserSuccess({ user }));
        } catch (error) {
            yield put(userActions.updateUserError({ error }));
        }
    },
});
