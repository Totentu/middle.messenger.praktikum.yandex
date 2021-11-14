import MesElement from '../../components/mes_element/index';
import Block from '../../common/block';
import {template as MesPanelTemplate} from './mes_panel.tmpl';
import {router} from '../../index';

interface IMesPanel {
  messages: Record<string, string>[];
}

export default class MesPanel extends Block {
  connected = 0;

  constructor (props: IMesPanel) {
    super('div', props, MesPanelTemplate);
    this.element.className = 'mes_panel';
    this.element.id = 'mes_panel';
    this.props.nodeElements = {};
    this.initMessages();
    this._render();

    router.eventBus.on('UpdateMessages', this.update.bind(this));
  }

  initMessages (): void {
    this.props.messagesNodes = [];
    const {messages} = this.props;
    messages.forEach((item: Record<string, string>) => {
      this.props.nodeElements['mes_' + item.id] = new MesElement({tempID: 'mes_' + item.id, author: item.user_id, text: item.content, time: item.time});
      this.props.messagesNodes.push({mes_node: `<node id=mes_${item.id}></node>`});
    });
  }

  update (inData: Record<string, string>[]): void {
    if (typeof (inData.length) === 'undefined') {
      this.props.messages.push(inData);
    } else {
      inData.sort(this.CompareForSort);
      this.props.messages = inData;
    }
    this.initMessages();
    this._render();
    const mesPanel = <HTMLDivElement>document.getElementById('mes_panel');
    mesPanel.scrollTop = mesPanel.scrollHeight;
  }

  CompareForSort (param1: Record<string, string>, param2: Record<string, string>): number {
    if (param1.id > param2.id) { return -1; } else { return 1; }
  }
}
