export type DefaultFn = (...args: any[]) => any;

export type HandlerReturnValue<R> = R | Promise<R> | Generator<unknown, R>;
