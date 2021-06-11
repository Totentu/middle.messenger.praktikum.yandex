export default class EventBus {
  private readonly listeners: Record<string, Array<(...arg) => void>>;

  constructor () {
    this.listeners = {};
  }

  on (event:string, callback: (...arg) => void | boolean):void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off (event:string, callback: (...arg) => void | boolean):void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  emit (event:string, ...args):void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach(function (listener) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      listener(...args);
    });
  }
}
