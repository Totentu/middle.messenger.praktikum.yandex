import Block from '../../common/block';
import {getCorrectValue} from '../../common/utils';
import {template as WritePanelTemplate} from './write_panel.tmpl';
import Input from '../../components/input/index';
import InputControl from '../../components/input_control/index';
import BtnImg from '../../components/but_img/index';
import {VALIDATE_FORM} from '../../common/constants';
// import {router} from '../../index';

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
    this.props.fieldsNodes = [{regControl: VALIDATE_FORM.message.regControl, errMes: VALIDATE_FORM.message.errMes, field_name: 'writeInput'}];
    ne.writeInputControl = new InputControl({className: 'form__input_control', textContent: 'проверка...', id: 'writeInputControl'});
    ne.writeInputControl.hide();
    ne.writeInput = new Input({className: 'write_panel__input', id: 'writeInput', value: this.props.writeValue, disabled: false});
    ne.writeInput.setProps({
      events: {
        focus: () => { getCorrectValue.bind(ne.writeInput)(VALIDATE_FORM.message.regControl, VALIDATE_FORM.message.errMes); },
        blur: () => { setTimeout(() => getCorrectValue.bind(ne.writeInput)(VALIDATE_FORM.message.regControl, VALIDATE_FORM.message.errMes), 200); },
        change: () => { ne.writeInput.setProps({value: ne.writeInput.element.value}); }
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
    window.router.socket.send(JSON.stringify({
      content: mes.value,
      type: 'message'
    }));
  }
}
