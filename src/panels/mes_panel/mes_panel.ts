import MesElement from '../../components/mes_element/index';
import Block from '../../common/block';
import {ConstructDomTree} from '../../common/utils';
import {template as MesPanelTemplate} from './mes_panel.tmpl';

interface mesPanelData {
  messages: Record<string, string>[];
  [index: string]:any;
}

export default class MesPanel extends Block {
  constructor (inData: mesPanelData) {
    const outData: mesPanelData = {
      messages: []
    };
    for (const item of inData.messages) {
      outData[item.tempID] = new MesElement({tempID: item.tempID, author: item.author, text: item.text, time: item.time});
      outData.messages.push({mes_node: `<node id=${item.tempID}></node>`});
    }
    super('div', outData);
    this.element.className = 'mes_panel';
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(MesPanelTemplate, this.props);

    return nodeStructure.body;
  }
}
