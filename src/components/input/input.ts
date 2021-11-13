import Block from '../../common/block';
import InputControl from '../input_control/index';
// import {template as inputTemplate} from './input.tmpl';

interface IInput {
  className: string;
  value: string;
  id: string;
  disabled: boolean;
  type?: string;
  errMes?: string;
  regControl?: RegExp;
  control?: InputControl;
  events?: Record<string, (...args: unknown[]) => void>;
}

export default class Input extends Block {
  constructor (props: IInput) {
    super('input', props);
    this._element.className = props.className;
    (<HTMLInputElement> this._element).value = props.value;
    this._element.id = props.id;
    if (props['disabled']) (<HTMLInputElement> this._element).disabled = true;
    if (props['type']) (<HTMLInputElement> this._element).type = props.type;
  }

  render (): HTMLElement {
    this._element.className = this.props.className;
    (<HTMLInputElement> this._element).value = this.props.value;
    this._element.id = this.props.id;

    // input не содержит внутренних узлов, в связи с этим возвращается пустой элемент
    return document.createElement('text');
  }
}
