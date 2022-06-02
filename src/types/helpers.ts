/**
 * @ignore
 */
export type DefaultFn = (...args: any[]) => any;

/**
 * @ignore
 */
export type HandlerReturnValue<R> = R | Promise<R> | Generator<unknown, R>;
