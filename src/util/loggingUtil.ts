const prefix = '[RENDERER] ';

export const log = {
    info: (msg: string) => {
        __electronLog.info(prefix + msg);
    },
    warn: (msg: string) => {
        __electronLog.warn(prefix + msg);
    },
    error: (msg: string) => {
        __electronLog.error(prefix + msg);
    }
}
