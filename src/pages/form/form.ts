import Button from '../../components/button/index';
import Input from '../../components/input/index';
import InputControl from '../../components/input_control/index';
import Block from '../../common/block';
import {ConstructDomTree, GetCorrectValue, SubmitControl} from '../../common/utils';
import {template as pageLoginTemplate} from './form.tmpl';

interface formData {
  title: string;
  fields: Record<string, string>[];
  buttons: Record<string, string>[];
  disabled: boolean;
  events?: Record<string, (...args) => void>;
}

export default class PageLogin extends Block {
  constructor (inData: formData) {
    const outData: formData = {
      title: inData.title,
      disabled: inData.disabled,
      fields: [],
      buttons: [],
      events: {}
    };
    for (const item of inData.fields) {
      outData[item.field_name] = new Input({className: 'form__input', id: item.field_name, value: item.field_value, disabled: inData.disabled});
      outData[`${item.field_name}_control`] = new InputControl({className: 'form__input_control', textContent: 'проверка...', id: `${item.field_name}_control`});
      outData[`${item.field_name}_control`].hide();
      outData[item.field_name].setProps({
        events: {
          focus: () => { GetCorrectValue.bind(outData[item.field_name])(item.regControl, item.errMes); },
          blur: () => { setTimeout(() => GetCorrectValue.bind(outData[item.field_name])(item.regControl, item.errMes), 200); },
          change: () => { outData[item.field_name].setProps({value: outData[item.field_name].element.value}); }
        },
        control: outData[`${item.field_name}_control`]
      });
      outData.fields.push({regControl: item.regControl, errMes: item.errMes, field_name: item.field_name, field_title: item.field_title, input_node: `<node id=${item.field_name}></node>`, input_error: `<node id=${item.field_name}_control></node>`});
    }
    for (const item of inData.buttons) {
      outData[item.button_name] = new Button({class: 'form__button', href: item.button_href, text: item.button_title, type: item.type});
      outData[item.button_name].setProps({
        events: {
          click: () => { SubmitControl.bind(outData[item.button_name])(this); }
        }
      });
      outData.buttons.push({button_title: item.button_title, button_node: `<node id=${item.button_name}></node>`});
    }
    super('div', outData);
    this._element.className = 'form';
    this.setProps({
      events: {
        submit: () => { SubmitControl.bind(this)(); }
      }
    });
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(pageLoginTemplate, this.props);

    return nodeStructure.body;
  }
}
