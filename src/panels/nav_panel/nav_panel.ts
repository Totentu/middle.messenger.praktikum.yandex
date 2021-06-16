import BtnImg from '../../components/but_img/index';
import Block from '../../common/block';
import {constructDomTree} from '../../common/utils';
import {template as NavPanelTemplate} from './nav_panel.tmpl';

interface INavPanel {
  hrefs: Record<string, string>[];
}

export default class NavPanel extends Block {
  constructor (props: INavPanel) {
    super('nav', props);
    this.element.className = 'nav_panel';
    this.props.nodeElements = {};
    this.initHrefs();
    this._render();
  }

  initHrefs (): void {
    this.props.hrefsNodes = [];
    const {hrefs} = this.props;
    hrefs.forEach((item: Record<string, string>) => {
      this.props[item.tempID] = new BtnImg({href: item.href, src: item.src});
      this.props.hrefsNodes.push({href_node: `<node id=${item.tempID}></node>`});
    });
  }

  render (): HTMLElement {
    const nodeStructure = constructDomTree(NavPanelTemplate, this.props);

    return nodeStructure.body;
  }
}
