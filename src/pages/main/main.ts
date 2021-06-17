import {ChatsData, MesData, TitleData, WriteData} from './testdata';
import {ChatsPanel} from '../../panels/chats_panel/index';
import {NavPanel} from '../../panels/nav_panel/index';
import {MesPanel} from '../../panels/mes_panel/index';
import {TitlePanel} from '../../panels/title_panel/index';
import {WritePanel} from '../../panels/write_panel/index';
import Block from '../../common/block';
import {constructDomTree} from '../../common/utils';
import {template as pageMainTemplate} from './main.tmpl';

export default class PageMain extends Block {
  constructor () {
    super('div');
    this.element.className = 'main';
    this.props.nodeElements = {};
    this.props.nodeElements.ChatsPanel = new ChatsPanel({chats: ChatsData, searchValue: '' });
    this.props.nodeElements.MesPanel = new MesPanel({messages: MesData});
    this.props.nodeElements.TitlePanel = new TitlePanel(TitleData);
    this.props.nodeElements.WritePanel = new WritePanel(WriteData);
    this.props.nodeElements.NavPanel = new NavPanel({
      hrefs: [
        {tempID: 'href1', href: 'profile.html', src: 'profile.png'},
        {tempID: 'href2', href: 'login.html', src: 'exit.png'}
      ]
    });
    this._render();
  }

  render (): HTMLElement {
    const nodeStructure = constructDomTree(pageMainTemplate, this.props);

    return nodeStructure.body;
  }
}
