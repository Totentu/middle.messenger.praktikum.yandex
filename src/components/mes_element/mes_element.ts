import Block from '../../common/block';
import {constructDomTree} from '../../common/utils';
import {template as MesElementTemplate} from './mes_element.tmpl';

interface IMesElement {
  author: string;
  text: string;
  time: string;
  tempID: string;
}

export default class MesElement extends Block {
  constructor (inData: IMesElement) {
    super('div', inData);
    if (inData.author === '') {
      this.element.className = 'mes_element__yours';
      this.setProps({author: 'Вы'});
    } else {
      this.element.className = 'mes_element__others';
    }
  }

  render (): HTMLElement {
    const nodeStructure = constructDomTree(MesElementTemplate, this.props);

    return nodeStructure.body;
  }
}
