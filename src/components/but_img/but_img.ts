import Block from '../../common/block';
import {constructDomTree} from '../../common/utils';
import {template as butImgTemplate} from './but_img.tmpl';

interface IButImg {
  href: string;
  src: string;
  type?: string;
}

export default class ButImg extends Block {
  constructor (props: IButImg) {
    super('div', props);
    if (props.type !== 'submit' && typeof (props.href) !== 'undefined') {
      this.setProps({
        events: {
          click: () => { if (typeof (props.href) !== 'undefined' && props.href !== '') window.location.href = props.href; }
        }
      });
    }
  }

  render (): HTMLElement {
    const nodeStructure = constructDomTree(butImgTemplate, this.props);

    const photoNode = nodeStructure.querySelector('div.form__but_img');
    if (photoNode !== null) {
      photoNode.setAttribute('style', `background-image: url(img/${this.props['src']})`);
    }

    return nodeStructure.body;
  }
}
