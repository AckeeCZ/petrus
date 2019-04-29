export * from './errors';
export * from './global';
export * from './storage';

// This object is once mutated when the 'configure' ('../configure') method is called.
// On this call custom configuration is merged with default configuration.
// The final configuration is validated and then freezed.
export const config = {};

export const getReducerKey = () => config.options.reducerKey;
