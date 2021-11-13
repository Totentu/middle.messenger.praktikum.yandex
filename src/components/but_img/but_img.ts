import Block from '../../common/block';
import {submitControl} from '../../common/utils';
import {template as butImgTemplate} from './but_img.tmpl';

interface IButImg {
  href: string;
  src: string;
  type?: string;
  apiKey?: string
  apiMethod?: string
}

export default class ButImg extends Block {
  constructor (props: IButImg) {
    super('div', props, butImgTemplate);
    if (props.type !== 'submit' && typeof (props.href) !== 'undefined') {
      this.setProps({
        events: {
          click: () => { submitControl.bind(this)(this); }
        }
      });
    }
  }

  render (): HTMLElement {
    const nodeStructure = this.constructDomTree();

    const photoNode = nodeStructure.querySelector('div.form__but_img');
    if (photoNode !== null) {
      photoNode.setAttribute('style', `background-image: url(img/${this.props['src']})`);
    }

    return nodeStructure.body;
  }
}
