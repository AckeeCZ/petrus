import { apiReducers as retrieval } from 'modules/tokens/modules/retrieval';
import { apiReducers as refreshment } from 'modules/tokens/modules/refreshment';

export default {
    ...retrieval,
    ...refreshment,
};
