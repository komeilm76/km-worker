export namespace Install {
  export type Event = {
    type: 'install';
    waitUntil: Function;
  };
}
