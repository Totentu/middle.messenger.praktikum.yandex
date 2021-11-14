import {ChatsPanel} from '../../panels/chats_panel/index';
import {UsersPanel} from '../../panels/users_panel/index';
import {NavPanel} from '../../panels/nav_panel/index';
import {MesPanel} from '../../panels/mes_panel/index';
import {WritePanel} from '../../panels/write_panel/index';
import Block from '../../common/block';
import {template as pageMainTemplate} from './main.tmpl';
import HTTPTransport from '../../common/httptransport';
import {router} from '../../index';

export default class PageMain extends Block {
  constructor () {
    super('div', {}, pageMainTemplate);
    this.element.className = 'main';
    this.props.nodeElements = {};
    this.props.nodeElements.MesPanel = new MesPanel({messages: []});
    this.props.nodeElements.ChatsPanel = new ChatsPanel({chats: [], searchValue: '' });
    this.props.nodeElements.UsersPanel = new UsersPanel({users: []});
    this.props.nodeElements.WritePanel = new WritePanel({writeValue: ''});
    this.props.nodeElements.NavPanel = new NavPanel({
      hrefs: [
        {tempID: 'href1', href: '/add_chat', src: 'plus.png'},
        {tempID: 'href2', href: '/profile', src: 'profile.png'},
        {tempID: 'href3', href: '/login', src: 'exit.png', apiKey: '/auth/logout', apiMethod: 'post'}
      ]
    });
    this._render();

    const HTTP = new HTTPTransport();
    const host = 'https://ya-praktikum.tech';

    HTTP.get(`${host}/api/v2/chats`, {})
      .then(
        (data: XMLHttpRequest) => {
          // this.props.nodeElements.ChatsPanel = new ChatsPanel({chats: JSON.parse(data.responseText), searchValue: '' });
          this.props.nodeElements.ChatsPanel.props.chats = JSON.parse(data.responseText);
          this.props.nodeElements.ChatsPanel.initChats();
          this.props.nodeElements.ChatsPanel._render();
          if (router.selectedChat > 0) {
            router.eventBus.emit('ChatSelected', router.selectedChat);
          }
        }
      );
  }
}
