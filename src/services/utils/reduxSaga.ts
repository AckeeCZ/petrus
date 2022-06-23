import { select } from 'redux-saga/effects';
import type { AppRootState } from 'types';

type S<Result, Args extends any[]> = (s: AppRootState, ...args: Args) => Result;

export function* appSelect<Result, Args extends any[]>(selector: S<Result, Args>, ...args: Args) {
    const result: Result = yield select((state: AppRootState) => {
        return selector(state, ...args);
    });

    return result;
}
