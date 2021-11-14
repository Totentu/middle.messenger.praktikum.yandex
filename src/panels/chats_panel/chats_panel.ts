import ChatElement from '../../components/chat_element/index';
import Input from '../../components/input/index';
import BtnImg from '../../components/but_img/index';
import Block from '../../common/block';
import {template as ChatsPanelTemplate} from './chats_panel.tmpl';
import {router} from '../../index';

interface IChatsPanel {
  chats: Record<string, string>[];
  searchValue: string;
}

export default class ChatsPanel extends Block {
  constructor (props: IChatsPanel) {
    super('div', props, ChatsPanelTemplate);
    this.element.className = 'chats_panel';
    this.props.searchValue = props.searchValue;
    this.props.nodeElements = {};
    this.props.nodeElements.searchInput = new Input({ className: 'chats_panel__input', id: 'searchInput', value: props.searchValue, disabled: false });
    this.props.nodeElements.searchBtnImg = new BtnImg({href: '', src: 'search.png'});
    this.initChats();
    this._render();

    router.eventBus.on('ChatSelected', this.update.bind(this));
  }

  initChats (): void {
    this.props.chatsNodes = [];
    const {chats} = this.props;
    chats.forEach((item: Record<string, string>) => {
      this.props.nodeElements['chat_' + item.id] = new ChatElement({tempID: 'chat_' + item.id, title: item.title, photo: item.avatar, text: item.text, time: item.time, new: item.unread_count});
      this.props.chatsNodes.push({chat_node: `<node id='chat_${item.id}'></node>`});
    });
  }

  update (): void {
    this.initChats();
    this._render();
  }
}
