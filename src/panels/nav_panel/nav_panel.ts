import BtnImg from '../../components/but_img/index';
import Block from '../../common/block';
import {template as NavPanelTemplate} from './nav_panel.tmpl';
import HTTPTransport from '../../common/httptransport';
// import {router} from '../../index';

interface INavPanel {
  hrefs: Record<string, string>[];
}

export default class NavPanel extends Block {
  constructor (props: INavPanel) {
    super('nav', props, NavPanelTemplate);
    this.element.className = 'nav_panel';
    this.props.nodeElements = {};
    this.props.user = '';
    this.initHrefs();
    this.setUser();
  }

  initHrefs (): void {
    this.props.hrefsNodes = [];
    const {hrefs} = this.props;
    hrefs.forEach((item: Record<string, string>) => {
      this.props[item.tempID] = new BtnImg({href: item.href, src: item.src, type: item.type, apiKey: item.apiKey, apiMethod: item.apiMethod});
      this.props.hrefsNodes.push({href_node: `<node id=${item.tempID}></node>`});
    });
  }

  setUser (): void {
    const HTTP = new HTTPTransport();
    const host = 'https://ya-praktikum.tech';

    HTTP.get(`${host}/api/v2/auth/user`, {})
      .then(
        (data: XMLHttpRequest) => {
          if (data.status === 401) {
            window.router.go('/login');
          } else {
            this.props.user = JSON.parse(data.response).login;
            this._render();
          }
        }
      );
  }
}
