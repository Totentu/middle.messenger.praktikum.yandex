import Block from '../../common/block';
import {constructDomTree} from '../../common/utils';
import {template as TitlePanelTemplate} from './title_panel.tmpl';

interface ITitlePanel {
  title: string;
  time: string;
  photo: string;
}

export default class TitlePanel extends Block {
  constructor (props: ITitlePanel) {
    super('div', props);
    this.element.className = 'title_panel';
  }

  render (): HTMLElement {
    const nodeStructure = constructDomTree(TitlePanelTemplate, this.props);

    const photoNode = nodeStructure.querySelector('div.title_panel__photo');
    if (photoNode !== null) {
      photoNode.setAttribute('style', `background-image: url(img/${this.props['photo']})`);
    }
    return nodeStructure.body;
  }
}
