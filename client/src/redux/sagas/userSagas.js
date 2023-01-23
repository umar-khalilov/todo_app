import { put } from 'redux-saga/effects';
import { actions } from '../actions';
import { httpTodoProvider } from '../api';

export const userSagas = {
    getAllUsersSaga: function* (action) {
        try {
            const {
                data: { data: users },
            } = yield httpTodoProvider.getAllUsers(action.payload);
            yield put(actions.getUsersSuccess({ users }));
        } catch (error) {
            yield put(actions.getUsersError({ error }));
        }
    },
};
