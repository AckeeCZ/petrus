import { all } from 'redux-saga/effects';

import { saga as refreshment } from 'Modules/tokens/modules/refreshment';
import { saga as retrieval } from 'Modules/tokens/modules/retrieval';
import { saga as storage } from 'Modules/tokens/modules/storage';

export default function*() {
    yield all([storage(), refreshment(), retrieval()]);
}
