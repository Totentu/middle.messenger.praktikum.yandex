import Block from '../../common/block';
import {constructDomTree} from '../../common/utils';
import {template as inputControlTemplate} from './input_control.tmpl';

interface IInputControl {
  className: string;
  textContent: string;
  id: string;
}

export default class InputControl extends Block {
  constructor (props: IInputControl) {
    super('div', props);
    this.element.className = props.className;
    this.element.textContent = props.textContent;
    this.element.id = props.id;
  }

  render (): HTMLElement {
    const nodeStructure = constructDomTree(inputControlTemplate, this.props);

    return nodeStructure.body;
  }
}
