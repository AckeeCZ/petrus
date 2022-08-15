import { all } from 'redux-saga/effects';
import { saga as petrus } from '../petrus';

export function* rootSaga() {
    yield all([petrus()]);
}
