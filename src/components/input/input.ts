import Block from '../../common/block';
// import {template as inputTemplate} from './input.tmpl';

interface inputData {
  className: string;
  value: string;
  id: string;
  disabled: boolean;
}

export default class Button extends Block {
  constructor (props: inputData) {
    super('input', props);
    this._element.className = `${this.props.className}`;
    this._element.value = `${this.props.value}`;
    this._element.id = `${this.props.id}`;
    if (this.props.disabled === true) this._element.disabled = true;
  }

  render (): HTMLElement {
    this._element.className = `${this.props.className}`;
    this._element.value = `${this.props.value}`;
    this._element.id = `${this.props.id}`;
    if (this.props.disabled === true) this._element.disabled = true;

    // input не содержит внутренних узлов, в связи с этим возвращается пустой элемент
    return document.createElement('text');
  }
}
