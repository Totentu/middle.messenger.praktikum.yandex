import {template as pageErr404Template} from './err404.tmpl';
import Block from '../../common/block';

export default class PageErr404 extends Block {
  constructor () {
    super('div', {}, pageErr404Template);
    this.element.className = 'form';
  }
}
