import EventBus from './event_bus';

type Callback = (...args) => void;
type property = string | number | boolean | HTMLElement | Callback;

export default class Block {
    static EVENTS = {
      INIT: 'init',
      FLOW_CDM: 'flow:component-did-mount',
      FLOW_RENDER: 'flow:render',
      FLOW_CDU: 'flow:component-did-update'
    };

    _element = null;
    _meta = null;
    props: ProxyConstructor;
    eventBus: () => EventBus;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor (tagName = 'div', props = {}) {
      const eventBus = new EventBus();
      this._meta = {
        tagName,
        props
      };

      this.props = this._makePropsProxy(props);

      this.eventBus = () => eventBus;

      this._registerEvents(eventBus);
      eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents (eventBus: EventBus): void {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createResources (): void {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    }

    init (): void {
      this._createResources();
      this._render();
    }

    _componentDidMount (): void {
      this.componentDidMount();
    }

    // Может переопределять пользователь, необязательно трогать
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    componentDidMount (): void {}

    _componentDidUpdate (oldProps: ProxyConstructor, newProps: ProxyConstructor): void {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (response) this._render();
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate (oldProps: ProxyConstructor, newProps: ProxyConstructor): boolean {
      return (JSON.stringify(oldProps) !== JSON.stringify(newProps));
    }

    setProps = (nextProps: ProxyConstructor) : void => {
      if (!nextProps) {
        return;
      }
      const oldProps: Record<string, property> = {};
      for (const key in this.props) {
        if (Object.hasOwnProperty.call(this.props, key)) {
          oldProps[key] = this.props[key];
        }
      }
      Object.assign(this.props, nextProps);

      this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, nextProps);
    };

    get element (): HTMLElement {
      return this._element;
    }

    _render (): void {
      const block : HTMLElement = this.render();
      while (this._element.firstChild) {
        this._element.removeChild(this._element.firstChild);
      }
      if (block.childNodes) {
        for (let i = 0; i < block.childNodes.length; i++) {
          if (block.firstChild.parentNode === block.childNodes[i].parentNode) {
            this._element.append(block.childNodes[i]);
          }
        }
      }
    }

    render (): HTMLElement {
      return this._element;
    }

    getContent (): HTMLElement {
      return this.element;
    }

    _makePropsProxy (props: Record<string, property>): ProxyConstructor {
      const handler = {
        get (target, prop): property {
          if (typeof (prop) === 'string' && prop.indexOf('_') === 0) {
            throw new Error('нет доступа');
          }
          const value = target[prop];
          return typeof value === 'function' ? value.bind(target) : value;
        },
        set (target, prop, value): boolean {
          if (typeof (prop) === 'string' && prop.indexOf('_') === 0) {
            throw new Error('нет доступа');
          }
          target[prop] = value;

          return true;
        },
        deleteProperty (target, prop): boolean {
          if (typeof (prop) === 'string' && prop.indexOf('_') === 0) {
            throw new Error('нет доступа');
          }
          delete target[prop];
          return true;
        }
      };
      return new Proxy(props, handler);
    }

    _createDocumentElement (tagName: string): HTMLElement {
      // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
      return document.createElement(tagName);
    }

    show (): void {
      this.element.style.display = 'block';
    }

    hide (): void {
      this.element.style.display = 'none';
    }
}
