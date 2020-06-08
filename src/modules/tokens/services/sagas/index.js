import { all } from 'redux-saga/effects';

import { saga as refreshment } from 'modules/tokens/modules/refreshment';
import { saga as retrieval } from 'modules/tokens/modules/retrieval';
import { saga as storage } from 'modules/tokens/modules/storage';

export default function* () {
    yield all([storage(), refreshment(), retrieval()]);
}
