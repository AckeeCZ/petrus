import config from './sagas/config';

import localStorageMock from './serverMocks/localStorageMock';
import sessionStorageMock from './serverMocks/sessionStorageMock';

export const logger = () => config.logger;

// this is convenient for apps SSR apps
const getGlobalEnv = () => {
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    return {};
};

export const globalEnv = getGlobalEnv();
export const storage = {
    local: globalEnv.localStorage || localStorageMock,
    session: globalEnv.sessionStorage || sessionStorageMock,
};
