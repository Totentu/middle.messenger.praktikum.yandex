import Block from '../../common/block';
import {ConstructDomTree} from '../../common/utils';
import {template as buttonTemplate} from './button.tmpl';

interface buttonData {
  href: string;
  text: string;
  class: string;
  type?: string;
}

export default class Button extends Block {
  constructor (props: buttonData) {
    super('button', props);
    this._element.className = props.class;
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(buttonTemplate, this.props);

    return nodeStructure.body;
  }
}
