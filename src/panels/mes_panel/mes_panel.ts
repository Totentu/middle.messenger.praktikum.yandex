import MesElement from '../../components/mes_element/index';
import Block from '../../common/block';
import {constructDomTree} from '../../common/utils';
import {template as MesPanelTemplate} from './mes_panel.tmpl';

interface IMesPanel {
  messages: Record<string, string>[];
}

export default class MesPanel extends Block {
  constructor (props: IMesPanel) {
    super('div', props);
    this.element.className = 'mes_panel';
    this.props.nodeElements = {};
    this.initMessages();
    this._render();
  }

  initMessages (): void {
    this.props.messagesNodes = [];
    const {messages} = this.props;
    messages.forEach((item: Record<string, string>) => {
      this.props.nodeElements[item.tempID] = new MesElement({tempID: item.tempID, author: item.author, text: item.text, time: item.time});
      this.props.messagesNodes.push({mes_node: `<node id=${item.tempID}></node>`});
    });
  }

  render (): HTMLElement {
    const nodeStructure = constructDomTree(MesPanelTemplate, this.props);

    return nodeStructure.body;
  }
}
