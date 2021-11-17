import EventBus from './event_bus';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Handlebars from '../../node_modules/handlebars/dist/cjs/handlebars';
import {IsObject} from './utils';
type TElement = HTMLElement | HTMLInputElement | HTMLButtonElement | HTMLBodyElement | HTMLDivElement;

export default class Block {
    static EVENTS = {
      INIT: 'init',
      FLOW_CDM: 'flow:component-did-mount',
      FLOW_RENDER: 'flow:render',
      FLOW_CDU: 'flow:component-did-update'
    };

    _element: TElement;
    _meta: {tagName: string, props: TProps};
    _template: string;
    props: TProps;
    eventBus: () => EventBus;

    constructor (tagName = 'div', props: TProps = {}, template = '') {
      const eventBus = new EventBus();
      this._meta = {
        tagName,
        props
      };
      this._template = template;
      if (typeof (props.events) === 'undefined') props.events = {};
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
      const {tagName} = this._meta;
      this._element = this._createDocumentElement(tagName);
    }

    init (): void {
      this._createResources();
      this._render();
    }

    _componentDidMount (): void {
      this.componentDidMount();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    componentDidMount (): void {}

    _componentDidUpdate (oldProps: TProps, newProps: TProps): void {
      const response = this.componentDidUpdate(oldProps, newProps);
      if (response) this._render();
    }

    componentDidUpdate (oldProps: TProps, newProps: TProps): boolean {
      if (Object.keys(oldProps).length !== Object.keys(newProps).length) {
        return true;
      }
      for (const key in oldProps) {
        if (Object.hasOwnProperty.call(oldProps, key) && Object.hasOwnProperty.call(newProps, key)) {
          if (oldProps[key] !== newProps[key]) {
            return true;
          }
        } else {
          return true;
        }
      }
      return false;
    }

    setProps = (nextProps: TProps) : void => {
      if (!nextProps) {
        return;
      }
      const oldProps: TProps = {};
      for (const key in this.props) {
        if (Object.hasOwnProperty.call(this.props, key)) {
          oldProps[key] = this.props[key];
        }
      }
      Object.assign(this.props, nextProps);

      this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, nextProps);
    };

    get element (): TElement {
      return this._element;
    }

    _addEvents (): void {
      const key = 'events';
      const eventList = this.props[key];

      Object.keys(eventList).forEach(eventName => {
        this._element.addEventListener(eventName, eventList[eventName]);
      });
    }

    _removeEvents (): void {
      const key = 'events';
      const eventList = this.props[key];

      Object.keys(eventList).forEach(eventName => {
        this._element.removeEventListener(eventName, eventList[eventName]);
      });
    }

    _render (): void {
      const block : HTMLElement = this.render();
      while (this._element.firstChild) {
        this._element.removeChild(this._element.firstChild);
      }

      if (block.childNodes) {
        for (let i = 0; i < block.childNodes.length; i++) {
          if (block.firstChild?.parentNode === block.childNodes[i].parentNode) {
            this._element.append(block.childNodes[i]);
          }
        }
      }
      this._addEvents();
    }

    render (): HTMLElement {
      const nodeStructure = this.constructDomTree();
      return nodeStructure.body;
    }

    getContent (): HTMLElement {
      return this.element;
    }

    _makePropsProxy (props: TProps): TProps {
      const handler = {
        get (target: TPropertyValue, prop: string): TPropertyValue {
          if (prop.indexOf('_') === 0) {
            throw new Error('нет доступа');
          }
          const value = target[prop];
          return typeof value === 'function' ? value.bind(target) : value;
        },
        set (target: TPropertyValue, prop: string, value: TPropertyValue): boolean {
          if (prop.indexOf('_') === 0) {
            throw new Error('нет доступа');
          }
          target[prop] = value;
          return true;
        },
        deleteProperty (target: TPropertyValue, prop: string): boolean {
          if (prop.indexOf('_') === 0) {
            throw new Error('нет доступа');
          }
          delete target[prop];
          return true;
        }
      };
      return new Proxy(props, handler);
    }

    _createDocumentElement (tagName: string): HTMLElement {
      return document.createElement(tagName);
    }

    show (): void {
      this.element.classList.remove('hidden');
    }

    hide (): void {
      this.element.classList.add('hidden');
    }

    constructDomTree (): Document {
      const template = Handlebars.compile(this._template);

      const HTMLString = template(this.props);
      const parser = new DOMParser();
      const nodeStructure = parser.parseFromString(HTMLString, 'text/html');

      // Специальный механизм, позволяющий в шаблон добавлять "псевдо-теги" node для включения в DOM-дерево живые компоненты
      const nodes = nodeStructure.getElementsByTagName('node');
      for (let i = nodes.length - 1; i >= 0; i--) {
        if (IsObject(this.props[nodes[i].id])) {
          nodes[i]?.parentNode?.insertBefore((<Block> this.props[nodes[i].id]).element, nodes[i]);
        } else if (IsObject(this.props?.nodeElements)) {
          if (IsObject(this.props?.nodeElements[nodes[i].id])) {
            nodes[i]?.parentNode?.insertBefore((<Block> this.props?.nodeElements[nodes[i].id]).element, nodes[i]);
          }
        }
        nodes[i].remove();
      }

      return nodeStructure;
    }
}
