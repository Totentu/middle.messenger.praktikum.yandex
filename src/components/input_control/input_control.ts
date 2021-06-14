import Block from '../../common/block';
import {ConstructDomTree} from '../../common/utils';
import {template as inputControlTemplate} from './input_control.tmpl';

interface inputControlData {
  className: string;
  textContent: string;
  id: string;
}

export default class InputControl extends Block {
  constructor (props: inputControlData) {
    super('div', props);
    this.element.className = props.className;
    this.element.textContent = props.textContent;
    this.element.id = props.id;
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(inputControlTemplate, this.props);

    return nodeStructure.body;
  }
}
