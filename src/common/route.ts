import Block from './block';

export default class Route {
    _pathname: string;
    _blockClass: TBlockClass;
    _block: Block | null;
    _props: TProps;
    _params: string;

    constructor (pathname: string, view: TBlockClass, props: TProps) {
      this._pathname = pathname;
      this._blockClass = view;
      this._block = null;
      this._props = props;
    }

    navigate (pathname: string): void {
      if (this.match(pathname)) {
        this._pathname = pathname;
        this.render();
      }
    }

    leave (): void {
      if (this._block) {
        this._block.hide();
        this._block.element.remove();
        this._block = null;
      }
    }

    match (pathname: string): boolean {
      return (pathname === this._pathname);
    }

    render (): void {
      if (!this._block) {
        this._block = new this._blockClass(this._props);
        document.querySelector('#root')?.append((<Block> this._block).element);
        return;
      }

      this._block.show();
    }
}
