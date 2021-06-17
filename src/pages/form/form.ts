import Button from '../../components/button/index';
import Input from '../../components/input/index';
import InputControl from '../../components/input_control/index';
import Block from '../../common/block';
import {constructDomTree, getCorrectValue, submitControl} from '../../common/utils';
import {template as pageFormTemplate} from './form.tmpl';

interface IPageForm {
  title: string;
  fields: Record<string, string | RegExp>[];
  buttons: Record<string, string>[];
  disabled: boolean;
}

export default class PageForm extends Block {
  constructor (props: IPageForm) {
    super('div', props);
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
      ne[id] = new Button({class: 'form__button', href: item.button_href, text: item.button_title, type: item.type});
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
    const ne = this.props.nodeElements;
    this.props.fieldsNodes = [];
    const {fields} = this.props;
    fields.forEach((item: Record<string, string | RegExp>) => {
      const id = <string>item.field_name;

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

  render (): HTMLElement {
    const nodeStructure = constructDomTree(pageFormTemplate, this.props);

    return nodeStructure.body;
  }
}
