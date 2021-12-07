import {template as pageErr404Template} from './err404.tmpl';
import Block from '../../common/block';
import Button from '../../components/button/index';
import {SubmitControl} from '../../common/utils';

export default class PageErr404 extends Block {
  constructor () {
    super('div', {}, pageErr404Template);
    this.element.className = 'form';
    this.props.nodeElements = {};

    const id = 'btnReturn';
    this.props.nodeElements[id] = new Button({class: 'form__button', href: '/login', text: 'Вернуться', type: 'href'});
    this.props.nodeElements[id].setProps({
      events: {
        click: () => { SubmitControl.bind(this.props.nodeElements[id])(this); }
      }
    });
    this._render();
  }
}
