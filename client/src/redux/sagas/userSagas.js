import { put } from 'redux-saga/effects';
import { Actions } from '../actions';
import * as API from '../api';

export function* getUsersSaga(action) {
    try {
        const {
            data: { data: users },
        } = yield API.getUsers();
        yield put(Actions.getUsersSuccess(users));
    } catch (err) {
        yield put(Actions.getUsersError({ err }));
    }
}