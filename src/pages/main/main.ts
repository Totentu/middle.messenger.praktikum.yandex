import {ChatsPanel} from '../../panels/chats_panel/index';
import {NavPanel} from '../../panels/nav_panel/index';
import {MesPanel} from '../../panels/mes_panel/index';
import {TitlePanel} from '../../panels/title_panel/index';
import {WritePanel} from '../../panels/write_panel/index';
import Block from '../../common/block';
import {ConstructDomTree} from '../../common/utils';
import {template as pageMainTemplate} from './main.tmpl';

interface MainData {
  ChatsPanel: Block;
  NavPanel: Block;
  MesPanel: Block;
  TitlePanel: Block;
  WritePanel: Block;
}

export default class PageMain extends Block {
  constructor () {
    const outData: MainData = {
      ChatsPanel: new ChatsPanel({
        chats: [
          {tempID: 'chat1', title: 'Беседа 1', photo: 'pic1.jpg', text: 'Начало беседы...', time: '15:04', new: '2'},
          {tempID: 'chat2', title: 'Беседа 2', photo: 'pic2.jpg', text: 'Начало беседы...', time: '15:04', new: '0'},
          {tempID: 'chat3', title: 'Беседа 3', photo: 'pic3.jpg', text: 'Начало беседы...', time: '15:04', new: '1'},
          {tempID: 'chat4', title: 'Беседа 4', photo: 'pic4.jpg', text: 'Начало беседы...', time: '15:04', new: '3'},
          {tempID: 'chat5', title: 'Беседа 5', photo: 'pic5.jpg', text: 'Начало беседы...', time: '15:04', new: '0'}
        ],
        searchValue: ''
      }),
      NavPanel: new NavPanel({
        hrefs: [
          {tempID: 'href1', href: 'profile.html', src: 'profile.png'},
          {tempID: 'href2', href: 'login.html', src: 'exit.png'}
        ]
      }),
      MesPanel: new MesPanel({
        messages: [
          {
            tempID: 'mes1', author: 'Автор', time: '11:45', text: `Люблю грозу в начале мая,
                                                                      Когда весенний, первый гром,
                                                                      Как бы резвяся и играя,
                                                                      Грохочет в небе голубом.
                                                                      
                                                                      Гремят раскаты молодые,
                                                                      Вот дождик брызнул, пыль летит,
                                                                      Повисли перлы дождевые,
                                                                      И солнце нити золотит.`
          },
          {tempID: 'mes2', author: '', time: '11:45', text: 'Круто, а кто автор?'},
          {tempID: 'mes3', author: 'Автор', time: '11:45', text: 'Эм... не знаю, просто и инете нашел '},
          {tempID: 'mes4', author: '', time: '11:45', text: 'Ясно.'}
        ]
      }),
      TitlePanel: new TitlePanel({
        title: 'Беседа 1',
        photo: 'pic1.jpg',
        time: 'был в сети 2 часа назад'
      }),
      WritePanel: new WritePanel({
        writeValue: 'Начал писать сообщение...'
      })
    };
    super('div', outData);
    this._element.className = 'main';
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(pageMainTemplate, this.props);

    return nodeStructure.body;
  }
}
