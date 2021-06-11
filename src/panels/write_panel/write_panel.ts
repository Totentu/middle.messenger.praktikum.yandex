import Block from '../../common/block';
import {ConstructDomTree} from '../../common/utils';
import {template as WritePanelTemplate} from './write_panel.tmpl';
import Input from '../../components/input/index';
import BtnImg from '../../components/but_img/index';

interface writePanelData {
  linkBtnImg?: BtnImg;
  writeInput?: Input;
  sendBtnImg?: BtnImg;
  writeValue: string;
}

export default class WritePanel extends Block {
  constructor (inData: writePanelData) {
    const outData: writePanelData = {
      writeInput: new Input({className: 'write_panel__input', id: 'writeInput', value: inData.writeValue, disabled: false}),
      linkBtnImg: new BtnImg({href: '', src: 'link_file.png'}),
      sendBtnImg: new BtnImg({href: '', src: 'send.png'}),
      writeValue: inData.writeValue
    };
    super('div', outData);
    this._element.className = 'write_panel';
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(WritePanelTemplate, this.props);

    return nodeStructure.body;
  }
}
