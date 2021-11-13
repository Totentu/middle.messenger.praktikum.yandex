import Block from '../../common/block';
import {template as MesElementTemplate} from './mes_element.tmpl';
// import {router} from '../../index';

interface IMesElement {
  author: string;
  text: string;
  time: string;
  tempID: string;
}

export default class MesElement extends Block {
  constructor (inData: IMesElement) {
    super('div', inData, MesElementTemplate);
    if (parseInt(inData.author) === window.router.currentUser) {
      this.element.className = 'mes_element__yours';
      this.setProps({author: 'Вы'});
    } else {
      this.element.className = 'mes_element__others';
    }
  }
}
