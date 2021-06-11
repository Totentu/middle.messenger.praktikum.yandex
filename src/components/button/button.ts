import Block from '../../common/block';
import {ConstructDomTree} from '../../common/utils';
import {template as buttonTemplate} from './button.tmpl';

interface buttonData {
  href: string;
  text: string;
  class: string;
}

export default class Button extends Block {
  constructor (props: buttonData) {
    super('a', props);
    this._element.href = this.props.href;
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(buttonTemplate, this.props);

    return nodeStructure.body;
  }
}
