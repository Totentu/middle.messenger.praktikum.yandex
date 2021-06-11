import Button from '../../components/button/index';
import Input from '../../components/input/index';
import Block from '../../common/block';
import {ConstructDomTree} from '../../common/utils';
import {template as pageLoginTemplate} from './form.tmpl';

interface formData {
  title: string;
  fields: Record<string, string>[];
  buttons: Record<string, string>[];
  disabled: boolean;
}

export default class PageLogin extends Block {
  constructor (inData: formData) {
    const outData: formData = {
      title: inData.title,
      disabled: inData.disabled,
      fields: [],
      buttons: []
    };
    for (const item of inData.fields) {
      outData[item.field_name] = new Input({className: 'form__input', id: item.field_name, value: item.field_value, disabled: inData.disabled});
      outData.fields.push({field_title: item.field_title, input_node: `<node id=${item.field_name}></node>`});
    }
    for (const item of inData.buttons) {
      outData[item.button_name] = new Button({class: 'form__button', href: item.button_href, text: item.button_title});
      outData.buttons.push({button_title: item.button_title, button_node: `<node id=${item.button_name}></node>`});
    }
    super('div', outData);
    this._element.className = 'form';
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(pageLoginTemplate, this.props);

    return nodeStructure.body;
  }
}
