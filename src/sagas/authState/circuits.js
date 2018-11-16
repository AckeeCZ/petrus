import { call, take, race } from 'redux-saga/effects';

function* runUnit({ pattern, task }) {
    const result = yield take(pattern);
    yield call(task, result);
}

function* runUnits(units = []) {
    for (const unit of units) {
        yield call(runUnit, unit);
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
 * @param  {Array of UnitShape} units
 */
export function* simpleCircuit(units = []) {
    while (true) {
        yield runUnits(units);
    }
}

/**
 * First unit is executed,
 * then all the units from index 1, to last index - 2,
 * if during exucution of those intermediate units
 * is triggered pattern of last unit, the intermediate units are cancelled
 * and task of the last unit is executed.
 * @param {Array of UnitShape} units
 */
export function* deepCircuit(units = []) {
    if (units.length < 3) {
        throw new Error(`The 'units' array must include at least 3 units, not only ${units.length} unit/s.`);
    }

    const firstUnit = units[0];
    const intermediateUnits = units.slice(1, units.length - 2);
    const lastUnit = units[units.length - 1];

    while (true) {
        yield runUnit(firstUnit);

        const result = yield race({
            deepUnits: call(runUnits, intermediateUnits),
            lastUnitResult: take(lastUnit.pattern),
        });

        yield call(lastUnit.task, result.lastUnitResult);
    }
}
