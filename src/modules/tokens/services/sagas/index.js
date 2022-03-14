import { all } from 'redux-saga/effects';

import { config } from 'config';

import { saga as refreshment } from 'modules/tokens/modules/refreshment';
import { retrieveTokens } from 'modules/tokens/modules/retrieval';
import { saga as storage } from 'modules/tokens/modules/storage';

export default function* () {
    yield all([storage(), refreshment(), config.tokens.autoStartTokensRetrieval && retrieveTokens()].filter(Boolean));
}
