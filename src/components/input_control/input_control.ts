import Block from '../../common/block';
import {template as inputControlTemplate} from './input_control.tmpl';

interface IInputControl {
  className: string;
  textContent: string;
  id: string;
}

export default class InputControl extends Block {
  constructor (props: IInputControl) {
    super('div', props, inputControlTemplate);
    this.element.className = props.className;
    this.element.textContent = props.textContent;
    this.element.id = props.id;
  }
}
