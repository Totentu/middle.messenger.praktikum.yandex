import Block from '../../common/block';
import {ConstructDomTree} from '../../common/utils';
import {template as MesElementTemplate} from './mes_element.tmpl';

interface mesElementData {
  author: string;
  text: string;
  time: string;
  tempID: string;
}

export default class MesElement extends Block {
  constructor (inData: mesElementData) {
    super('div', inData);
    if (inData.author === '') {
      this.element.className = 'mes_element__yours';
      this.setProps({author: 'Вы'});
    } else {
      this.element.className = 'mes_element__others';
    }
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(MesElementTemplate, this.props);

    return nodeStructure.body;
  }
}
