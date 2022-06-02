import type { ActionPattern } from 'redux-saga/effects';
import { take, race } from 'redux-saga/effects';
import type { DefaultFn } from 'types';

type Unit = {
    pattern: ActionPattern;
    task: DefaultFn;
};

function* runUnit({ pattern, task }: Unit) {
    const result: unknown = yield take(pattern);
    yield* task(result);
}

function* runUnits(units: Unit[] = []) {
    for (const unit of units) {
        yield* runUnit(unit);
    }
}

/**
 * The flow is simple:
 * - wait for a trigger (handles take(unit.pattern) effect)
 * - execute task (handles call(unit.task, result))
 * - and repeat the same steps for next unit
 *
 * const UnitShape = {
 *    pattern: {String|Array|Function} - pattern for the take effect
 *    task: Function - receives result of the above take effect as first argument
 * }
 */
export function* simpleCircuit(units: Unit[] = []) {
    while (true) {
        yield* runUnits(units);
    }
}

/**
 * First unit is executed,
 * then all the units from index 1, to last index - 2,
 * if during exucution of those intermediate units
 * is triggered pattern of last unit, the intermediate units are cancelled
 * and task of the last unit is executed.
 */
export function* deepCircuit(units: Unit[] = []) {
    if (units.length < 3) {
        throw new Error(`The 'units' array must include at least 3 units, not only ${units.length} unit/s.`);
    }

    const firstUnit = units[0];
    const intermediateUnits = units.slice(1, units.length - 1);
    const lastUnit = units[units.length - 1];

    while (true) {
        yield* runUnit(firstUnit);

        const result: {
            lastUnitResult: Unit['pattern'];
        } = yield race({
            deepUnits: simpleCircuit(intermediateUnits),
            lastUnitResult: take(lastUnit.pattern),
        } as const);

        yield* lastUnit.task(result.lastUnitResult);
    }
}
