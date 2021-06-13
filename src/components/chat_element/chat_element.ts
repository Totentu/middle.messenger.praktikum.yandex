import Block from '../../common/block';
import {ConstructDomTree} from '../../common/utils';
import {template as ChatElementTemplate} from './chat_element.tmpl';

interface chatElementData {
  title: string;
  text: string;
  time: string;
  new: string;
  photo: string;
  tempID: string;
}

export default class ChatElement extends Block {
  constructor (inData: chatElementData) {
    super('div', inData);
    this._element.className = 'chat_element';
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(ChatElementTemplate, this.props);

    const photoNode = nodeStructure.querySelector('div.chat_element__photo');
    photoNode.setAttribute('style', `background-image: url(img/${this.props['photo']})`);

    return nodeStructure.body;
  }
}
