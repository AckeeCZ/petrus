import localStorageMock from './serverMocks/localStorageMock';
import sessionStorageMock from './serverMocks/sessionStorageMock';

export const logger = console;
// this is convenient for apps SSR apps
export const storage = {
    local: typeof window !== 'undefined' ? window.localStorage : localStorageMock,
    session: typeof window !== 'undefined' ? window.sessionStorage : sessionStorageMock,
};
