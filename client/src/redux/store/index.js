import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { rootReducer } from '../reducers';
import { rootSaga } from '../sagas';

const initialState = {
    count: 0,
};

function countReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1,
            };
        case 'DECREMENT':
            return {
                count: state.count - 1,
            };
        default:
            return state;
    }
}

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    countReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
