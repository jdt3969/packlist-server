export const p = (promise: Promise<any>): Promise<any> =>
  promise.then((data) => [null, data]).catch((err) => [err]);
