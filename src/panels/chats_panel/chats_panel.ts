import ChatElement from '../../components/chat_element/index';
import Input from '../../components/input/index';
import BtnImg from '../../components/but_img/index';
import Block from '../../common/block';
import {ConstructDomTree} from '../../common/utils';
import {template as ChatsPanelTemplate} from './chats_panel.tmpl';

interface chatPanelData {
  chats: Record<string, string>[];
  searchInput?: Input;
  searchBtnImg?: BtnImg;
  searchValue: string;
}

export default class ChatsPanel extends Block {
  constructor (inData: chatPanelData) {
    const outData: chatPanelData = {
      chats: [],
      searchInput: new Input({className: 'chats_panel__input', id: 'searchInput', value: inData.searchValue, disabled: false}),
      searchBtnImg: new BtnImg({href: '', src: 'search.png'}),
      searchValue: inData.searchValue
    };
    for (const item of inData.chats) {
      outData[item.tempID] = new ChatElement({tempID: item.tempID, title: item.title, photo: item.photo, text: item.text, time: item.time, new: item.new});
      outData.chats.push({chat_node: `<node id=${item.tempID}></node>`});
    }
    super('div', outData);
    this._element.className = 'chats_panel';
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(ChatsPanelTemplate, this.props);

    return nodeStructure.body;
  }
}
