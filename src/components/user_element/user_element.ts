import Block from '../../common/block';
import {template as UserElementTemplate} from './user_element.tmpl';
import {router} from '../../index';

interface IUserElement {
  nick: string;
  photo: string;
  tempID: string;
}

export default class UserElement extends Block {
  constructor (props: IUserElement) {
    super('div', props, UserElementTemplate);
    this.element.className = 'user_element';
    this.setProps({
      events: {
        click: (event: TPropertyValue) => { this.delete(event); }
      }
    });
  }

  render (): HTMLElement {
    const nodeStructure = this.constructDomTree();

    const photoNode = nodeStructure.querySelector('div.user_element__photo');
    if (photoNode !== null) {
      if (this.props['photo']) {
        photoNode.setAttribute('style', `background-image: url(https://ya-praktikum.tech/api/v2/resources/${this.props['photo']})`);
      }
    }
    return nodeStructure.body;
  }

  delete (e: TPropertyValue): void {
    const ClickClass = e?.target?.className;

    if (ClickClass === 'user_element__delete') {
      router.go('/delete_user', JSON.stringify({chatId: `${router.selectedChat}`, users: `${this.props['tempID'].substr(5)}`, display_name: `${this.props['nick']}`}));
    }
  }
}
