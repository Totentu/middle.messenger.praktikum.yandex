import Block from '../../common/block';
// import {template as inputTemplate} from './input.tmpl';

interface inputData {
  events?: Record<string, (...args: any[]) => void>;
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
    const inputElement: any = this._element;
    inputElement.className = props.className;
    inputElement.value = props.value;
    inputElement.id = props.id;
    if (props['disabled'] === true) inputElement.disabled = true;
  }

  render (): HTMLElement {
    const inputElement: any = this._element;
    inputElement.className = this.props.className;
    inputElement.value = this.props.value;
    inputElement.id = this.props.id;

    // input не содержит внутренних узлов, в связи с этим возвращается пустой элемент
    return document.createElement('text');
  }
}
