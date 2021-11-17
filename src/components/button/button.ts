import Block from '../../common/block';
import {template as buttonTemplate} from './button.tmpl';

interface IButton {
  href: string;
  text: string;
  class: string;
  type?: string;
  apiKey?: string
  apiMethod?: string
}

export default class Button extends Block {
  constructor (props: IButton) {
    super('button', props, buttonTemplate);
    this.element.className = props.class;
  }
}
