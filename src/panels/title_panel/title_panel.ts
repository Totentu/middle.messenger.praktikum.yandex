import Block from '../../common/block';
import {ConstructDomTree} from '../../common/utils';
import {template as TitlePanelTemplate} from './title_panel.tmpl';

interface titlePanelData {
  title: string;
  time: string;
  photo: string;
}

export default class TitlePanel extends Block {
  constructor (inData: titlePanelData) {
    super('div', inData);
    this._element.className = 'title_panel';
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(TitlePanelTemplate, this.props);

    const photoNode = nodeStructure.querySelector('div.title_panel__photo');
    photoNode.setAttribute('style', `background-image: url(img/${this.props['photo']})`);

    return nodeStructure.body;
  }
}
