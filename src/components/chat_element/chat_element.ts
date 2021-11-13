import Block from '../../common/block';
import {template as ChatElementTemplate} from './chat_element.tmpl';
// import {router} from '../../index';
import {SetCookie} from '../../common/utils';

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
    super('div', props, ChatElementTemplate);
    props.tempID === 'chat_' + window.router.selectedChat ? this.element.className = 'chat_element_selected' : this.element.className = 'chat_element';
    this.setProps({
      events: {
        click: (event: TPropertyValue) => { this.onclick(event); }
      }
    });
  }

  render (): HTMLElement {
    const nodeStructure = this.constructDomTree();

    const photoNode = nodeStructure.querySelector('div.chat_element__photo');
    if (photoNode !== null) {
      if (this.props['photo']) {
        photoNode.setAttribute('style', `background-image: url(https://ya-praktikum.tech/api/v2/resources/${this.props['photo']})`);
      }
    }
    return nodeStructure.body;
  }

  onclick (e: TPropertyValue): void {
    const ClickClass = e?.target?.className;
    window.router.selectedChat = parseInt(`${this.props['tempID'].substr(5)}`);

    if (ClickClass === 'chat_element__delete') {
      window.router.go('/delete_chat', JSON.stringify({chatId: window.router.selectedChat, title: `${this.props['title']}`}));
    } else {
      SetCookie('selectedChat', '' + window.router.selectedChat);
      window.router.eventBus.emit('UpdateUsers', window.router.selectedChat);
    }
  }
}
