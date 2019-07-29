function getGlobalEnv() {
    if (typeof window !== 'undefined') {
        return window;
    }

    if (typeof global !== 'undefined') {
        return global;
    }

    return {};
}

export const globalEnv = getGlobalEnv();
