import ChatElement from '../../components/chat_element/index';
import Input from '../../components/input/index';
import BtnImg from '../../components/but_img/index';
import Block from '../../common/block';
import {constructDomTree} from '../../common/utils';
import {template as ChatsPanelTemplate} from './chats_panel.tmpl';

interface IChatsPanel {
  chats: Record<string, string>[];
  searchValue: string;
}

export default class ChatsPanel extends Block {
  constructor (props: IChatsPanel) {
    super('div', props);
    this.element.className = 'chats_panel';
    this.props.searchValue = props.searchValue;
    this.props.nodeElements = {};
    this.props.nodeElements.searchInput = new Input({ className: 'chats_panel__input', id: 'searchInput', value: props.searchValue, disabled: false });
    this.props.nodeElements.searchBtnImg = new BtnImg({href: '', src: 'search.png'});
    this.initChats();
    this._render();
  }

  initChats (): void {
    this.props.chatsNodes = [];
    const {chats} = this.props;
    chats.forEach((item: Record<string, string>) => {
      this.props.nodeElements[item.tempID] = new ChatElement({tempID: item.tempID, title: item.title, photo: item.photo, text: item.text, time: item.time, new: item.new});
      this.props.chatsNodes.push({chat_node: `<node id=${item.tempID}></node>`});
    });
  }

  render (): HTMLElement {
    const nodeStructure = constructDomTree(ChatsPanelTemplate, this.props);

    return nodeStructure.body;
  }
}
