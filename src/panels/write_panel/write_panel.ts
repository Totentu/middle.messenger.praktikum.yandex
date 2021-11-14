import Block from '../../common/block';
import {template as WritePanelTemplate} from './write_panel.tmpl';
import Input from '../../components/input/index';
import InputControl from '../../components/input_control/index';
import BtnImg from '../../components/but_img/index';
import {router} from '../../index';

interface IWritePanel {
  writeValue: string;
}

export default class WritePanel extends Block {
  constructor (props: IWritePanel) {
    super('div', props, WritePanelTemplate);
    this.element.className = 'write_panel';
    this.props.writeValue = props.writeValue;
    this.props.nodeElements = {};
    this.initButtons();
    this.initFields();
    this._render();
  }

  initFields (): void {
    const ne = this.props.nodeElements;
    this.props.fieldsNodes = [{field_name: 'writeInput'}];
    ne.writeInputControl = new InputControl({className: 'form__input_control', textContent: 'проверка...', id: 'writeInputControl'});
    ne.writeInputControl.hide();
    ne.writeInput = new Input({className: 'write_panel__input', id: 'writeInput', value: this.props.writeValue, disabled: false});
    ne.writeInput.setProps({
      events: {
        change: () => { ne.writeInput.setProps({value: ne.writeInput.element.value}); },
        keyup: (e: TPropertyValue) => { if (e?.code === 'Enter') this.sendmessage(); }
      },
      control: ne.writeInputControl
    });
  }

  initButtons (): void {
    const ne = this.props.nodeElements;
    ne.linkBtnImg = new BtnImg({href: '', src: 'link_file.png'});
    ne.sendBtnImg = new BtnImg({href: '', src: 'send.png', type: 'submit'});
    ne.sendBtnImg.setProps({
      events: {
        click: () => { this.sendmessage(); }
      }
    });
  }

  sendmessage (): void {
    const mes = <HTMLInputElement>document.getElementById('writeInput');
    router?.socket?.send(JSON.stringify({
      content: mes.value,
      type: 'message'
    }));
    mes.value = '';
  }
}
