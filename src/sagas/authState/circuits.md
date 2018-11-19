# Circuit abstraction

This abstraction is useful for cases, when you need wait for `ACTION_TYPE_A`, then execute blocking task A, then wait for `ACTION_TYPE_B`, then execute blocking task B and repeat.

### Unit

Let's divide the issue above into so called _units_:

```js
const unitA = {
    pattern: 'ACTION_TYPE_A',
    task: taskA,
};

const unitB = {
    pattern: 'ACTION_TYPE_B',
    task: taskB,
};
```

**A unit is object with 2 properties: `pattern` and `task`.** Pattern must be `string`, `array` or `function` (`pattern` is passed to the Redux Saga `take` effect). Task is a function, probably an asynchronous function or a generator.

### Circuit

**A circuit is a function that is sequentially running provided units.**

### Simple circuit

Infinite loop which consists of n units that are sequentially running one after another.

The implementation may look like this:

```js
function* simpleCircuit(units = []) {
    while (true) {
        for (const unit of units) {
            const result = yield take(unit.pattern);
            yield call(unit.task, result);
        }
    }
}
```

### Deep circuit

Run unit with index 0, then run still sequentially so called intermediate units (all units from index 1 to last index - 2). Intermediate units can be cancelled by pattern of the last unit. Then task of the last unit is executed. And the whole cycle repeats.

The implementation may look like this

```js
function* runUnit({ pattern, task }) {
    const result = yield take(pattern);
    yield call(task, result);
}

function* runUnits(units = []) {
    for (const unit of units) {
        yield call(runUnit, unit);
    }
}

function* simpleCircuit(units = []) {
    while (true) {
        yield runUnits(units);
    }
}

const firstUnit = units[0];
const intermediateUnits = units.slice(1, units.length - 1);
const lastUnit = units[units.length - 1];

while (true) {
    yield runUnit(firstUnit);

    const result = yield race({
        deepUnits: call(simpleCircuit, intermediateUnits),
        lastUnitResult: take(lastUnit.pattern),
    });

    yield call(lastUnit.task, result.lastUnitResult);
}
```
