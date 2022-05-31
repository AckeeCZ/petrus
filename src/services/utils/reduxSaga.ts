import { select } from 'redux-saga/effects';

type S<AppState, Result, Args extends any[]> = (s: AppState, ...args: Args) => Result;

export function* appSelect<AppState, Result, Args extends any[]>(selector: S<AppState, Result, Args>, ...args: Args) {
    const result: Result = yield select((state: AppState) => {
        return selector(state, ...args);
    });

    return result;
}
