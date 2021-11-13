import Button from '../button/index';
import Input from '../input/index';
import InputControl from '../input_control/index';
import Block from '../../common/block';
import {getCorrectValue, submitControl} from '../../common/utils';
import {template as pageFormTemplate} from './form.tmpl';
// import {router} from '../../index';

interface IPageForm {
  title: string;
  fields: Record<string, string | RegExp>[];
  buttons: Record<string, string | unknown>[];
  disabled: boolean;
}

export default class PageForm extends Block {
  constructor (props: IPageForm, template: string = pageFormTemplate) {
    super('div', props, template);
    this.element.className = 'form';
    this.props.nodeElements = {};
    this.initButtons();
    this.initFields();
    this._render();
  }

  initButtons (): void {
    const ne = this.props.nodeElements;
    this.props.buttonsNodes = [];
    const {buttons} = this.props;
    buttons.forEach((item: Record<string, string>) => {
      const id = item.button_name;
      ne[id] = new Button({class: 'form__button', href: item.button_href, text: item.button_title, type: item.type, apiKey: item.apiKey, apiMethod: item.apiMethod});
      ne[id].setProps({
        events: {
          click: () => { submitControl.bind(ne[id])(this); }
        }
      });
      this.props.buttonsNodes.push({button_title: item.button_title, button_node: `<node id=${id}></node>`});
    }

    );
  }

  initFields (): void {
    // Считываем значения переданные в форму (если они есть)
    let params: TPropertyValue;
    if (typeof (window.router._currentRoute?._params) === 'string' && window.router._currentRoute?._params !== '') {
      params = JSON.parse(<string>window.router._currentRoute?._params);
    }
    const ne = this.props.nodeElements;
    this.props.fieldsNodes = [];
    const {fields} = this.props;
    fields.forEach((item: Record<string, string | RegExp>) => {
      const id = <string>item.field_name;

      // Поставляем значения переданные в форму
      if (params && typeof (params[id]) !== 'undefined') item.field_value = params[id];

      // Создаем поле, для отображения ошибок заполнения основного поля
      ne[`${id}_control`] = new InputControl({className: 'form__input_control', textContent: 'проверка...', id: `${id}_control`});
      ne[`${id}_control`].hide();

      // Создаем основное поле для ввода информации
      ne[id] = new Input({className: 'form__input', id: id, value: <string>item.field_value, disabled: this.props.disabled});
      ne[id].setProps({
        events: {
          focus: () => { getCorrectValue.bind(ne[id])(item.regControl, item.errMes); },
          blur: () => { setTimeout(() => getCorrectValue.bind(ne[id])(item.regControl, item.errMes), 200); },
          change: () => { ne[id].setProps({value: ne[id].element.value}); }
        },
        control: <Input> ne[`${id}_control`]
      });
      this.props.fieldsNodes.push({regControl: item.regControl, errMes: item.errMes, field_name: id, field_title: item.field_title, input_node: `<node id=${id}></node>`, input_error: `<node id=${id}_control></node>`});
    });
  }
}
