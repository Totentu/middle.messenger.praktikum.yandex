import Block from '../../common/block';
import {constructDomTree} from '../../common/utils';
import {template as ChatElementTemplate} from './chat_element.tmpl';

interface IChatElement {
  title: string;
  text: string;
  time: string;
  new: string;
  photo: string;
  tempID: string;
}

export default class ChatElement extends Block {
  constructor (props: IChatElement) {
    super('div', props);
    this.element.className = 'chat_element';
  }

  render (): HTMLElement {
    const nodeStructure = constructDomTree(ChatElementTemplate, this.props);

    const photoNode = nodeStructure.querySelector('div.chat_element__photo');
    if (photoNode !== null) {
      photoNode.setAttribute('style', `background-image: url(img/${this.props['photo']})`);
    }
    return nodeStructure.body;
  }
}
