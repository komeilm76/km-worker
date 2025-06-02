export namespace Activate {
  export type Event = {
    type: 'activate';
    waitUntil: Function;
  };
}
