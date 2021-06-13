import Block from '../../common/block';
import {ConstructDomTree, GetCorrectValue, SubmitControl} from '../../common/utils';
import {template as WritePanelTemplate} from './write_panel.tmpl';
import Input from '../../components/input/index';
import InputControl from '../../components/input_control/index';
import BtnImg from '../../components/but_img/index';
import {VALIDATE_FORM} from '../../common/constants';

interface writePanelData {
  linkBtnImg?: BtnImg;
  writeInput?: Input;
  writeInputControl?: Input;
  sendBtnImg?: BtnImg;
  writeValue: string;
  fields?: Record<string, string | RegExp>[];
}

export default class WritePanel extends Block {
  constructor (inData: writePanelData) {
    const outData: writePanelData = {
      writeInput: new Input({className: 'write_panel__input', id: 'writeInput', value: inData.writeValue, disabled: false}),
      writeInputControl: new InputControl({className: 'form__input_control', textContent: 'проверка...', id: 'writeInputControl'}),
      linkBtnImg: new BtnImg({href: '', src: 'link_file.png'}),
      sendBtnImg: new BtnImg({href: '', src: 'send.png', type: 'submit'}),
      writeValue: inData.writeValue,
      fields: [
        {regControl: VALIDATE_FORM.message.regControl, errMes: VALIDATE_FORM.message.errMes, field_name: 'writeInput'}
      ]
    };
    outData.writeInputControl.hide();
    outData.writeInput.setProps({
      events: {
        focus: () => { GetCorrectValue.bind(outData.writeInput)(VALIDATE_FORM.message.regControl, VALIDATE_FORM.message.errMes); },
        blur: () => { setTimeout(() => GetCorrectValue.bind(outData.writeInput)(VALIDATE_FORM.message.regControl, VALIDATE_FORM.message.errMes), 200); },
        change: () => { outData.writeInput.setProps({value: outData.writeInput._element.value}); }
      },
      control: outData['writeInput' + 'Control']
    });
    super('div', outData);
    outData.sendBtnImg.setProps({
      events: {
        click: () => { SubmitControl.bind(outData.sendBtnImg)(this); }
      }
    });
    this._element.className = 'write_panel';
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(WritePanelTemplate, this.props);

    return nodeStructure.body;
  }
}
