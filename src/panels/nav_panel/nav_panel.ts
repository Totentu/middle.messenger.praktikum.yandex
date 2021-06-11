import BtnImg from '../../components/but_img/index';
import Block from '../../common/block';
import {ConstructDomTree} from '../../common/utils';
import {template as NavPanelTemplate} from './nav_panel.tmpl';

interface navPanelData {
  hrefs: Record<string, string>[];
}

export default class NavPanel extends Block {
  constructor (inData: navPanelData) {
    const outData: navPanelData = {
      hrefs: []
    };
    for (const item of inData.hrefs) {
      outData[item.tempID] = new BtnImg({href: item.href, src: item.src});
      outData.hrefs.push({href_node: `<node id=${item.tempID}></node>`});
    }
    super('nav', outData);
    this._element.className = 'nav_panel';
  }

  render (): HTMLElement {
    const nodeStructure = ConstructDomTree(NavPanelTemplate, this.props);

    return nodeStructure.body;
  }
}
