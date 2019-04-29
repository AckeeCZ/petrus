import { apiReducers as retrieval } from 'Modules/tokens/modules/retrieval';
import { apiReducers as refreshment } from 'Modules/tokens/modules/refreshment';

export default {
    ...retrieval,
    ...refreshment,
};
