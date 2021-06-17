import Block from '../../common/block';
import {constructDomTree} from '../../common/utils';
import {template as buttonTemplate} from './button.tmpl';

interface IButton {
  href: string;
  text: string;
  class: string;
  type?: string;
}

export default class Button extends Block {
  constructor (props: IButton) {
    super('button', props);
    this.element.className = props.class;
  }

  render (): HTMLElement {
    const nodeStructure = constructDomTree(buttonTemplate, this.props);

    return nodeStructure.body;
  }
}
