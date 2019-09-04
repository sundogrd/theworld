export const isIterable = (obj: any) => {
    return obj && typeof obj[Symbol.iterator] === 'function';
}
