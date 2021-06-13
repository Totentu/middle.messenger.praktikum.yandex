import Block from '../../common/block';
// import {template as inputTemplate} from './input.tmpl';

interface inputData {
  events?: Record<string, (...args) => void>;
  className: string;
  value: string;
  id: string;
  disabled: boolean;
  errMes?: string;
  regControl?: RegExp;
}

export default class Input extends Block {
  constructor (props: inputData) {
    super('input', props);
    this._element.className = props.className;
    this._element.value = props.value;
    this._element.id = props.id;
    if (props.disabled === true) this._element.disabled = true;
  }

  render (): HTMLElement {
    for (const key in this.props) {
      if (Object.hasOwnProperty.call(this.props, key)) {
        this._element[key] = this.props[key];
      }
    }

    // input не содержит внутренних узлов, в связи с этим возвращается пустой элемент
    return document.createElement('text');
  }
}
