import Block from '../../common/block';
import {ConstructDomTree} from '../../common/utils';
import {template as butImgTemplate} from './but_img.tmpl';

interface btnImgData {
  href: string;
  src: string;
}

export default class ButImg extends Block {
  constructor (props: btnImgData) {
    super('a', props);
    this._element.href = this.props.href;
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(butImgTemplate, this.props);

    const photoNode = nodeStructure.querySelector('div.form__but_img');
    photoNode.setAttribute('style', `background-image: url(img/${this.props.src})`);

    return nodeStructure.body;
  }
}
