import BtnImg from '../../components/but_img/index';
import UserElement from '../../components/user_element/index';
import Block from '../../common/block';
import {template as UsersPanelTemplate} from './users_panel.tmpl';
// import {router} from '../../index';
import HTTPTransport from '../../common/httptransport';

interface IUsersPanel {
  users: Record<string, string>[];
}

export default class UsersPanel extends Block {
  constructor (props: IUsersPanel) {
    super('div', props, UsersPanelTemplate);
    this.element.className = 'users_panel';
    this.props.nodeElements = {};
    this.initUsers();
    this.props['btn_add_user'] = new BtnImg({href: '/chat_user_add', src: 'plus.png'});
    this.props.hrefsNodes = [];
    this.props.hrefsNodes.push({href_node: '<node id="btn_add_user"></node>'});
    this._render();

    window.router.eventBus.on('UpdateUsers', this.update.bind(this));
  }

  initUsers (): void {
    this.props.usersNodes = [];
    const {users} = this.props;
    users.forEach((item: Record<string, string>) => {
      this.props.nodeElements['user_' + item.id] = new UserElement({tempID: 'user_' + item.id, nick: item.display_name, photo: item.avatar});
      this.props.usersNodes.push({user_node: `<node id='user_${item.id}'></node>`});
    });
  }

  update (chatId: number): void {
    const HTTP = new HTTPTransport();
    const host = 'https://ya-praktikum.tech';

    HTTP.get(`${host}/api/v2/chats/${chatId}/users`, {})
      .then(
        (data: XMLHttpRequest) => {
          this.props.users = JSON.parse(data.responseText);
          this.initUsers();
          this._render();
        }
      );

    HTTP.post(`${host}/api/v2/chats/token/${window.router.selectedChat}`, {})
      .then(
        (data: XMLHttpRequest) => {
          if (data.status === 401) {
            window.router.go('/login');
          } else {
            window.router.currentToken = JSON.parse(data.responseText).token;
          }
        }
      );
  }
}
