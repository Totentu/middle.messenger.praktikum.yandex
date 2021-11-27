import Route from './route';
import EventBus from './event_bus';
import {GetCookie} from './utils';
import HTTPTransport from './httptransport';

export default class Router {
  // eslint-disable-next-line no-use-before-define
  private static __instance: Router;

  routes: Route[];
  history: typeof window.history;
  eventBus = new EventBus();
  lastChat: string | null;
  selectedChat = 0;
  currentUser = 0;
  pingInterval: NodeJS.Timeout;
  socket : WebSocket;
  _currentRoute: Route | null | undefined;

  constructor () {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this.lastChat = GetCookie('selectedChat');
    if (this.lastChat) this.selectedChat = parseInt(this.lastChat);
    this.eventBus.on('ChatSelected', this.connect.bind(this));

    Router.__instance = this;
  }

  connect (): void {
    if (this.selectedChat > 0 && this.currentUser) {
      this.socket?.close();
      const HTTP = new HTTPTransport();
      const host = 'https://ya-praktikum.tech';
      HTTP.post(`${host}/api/v2/chats/token/${this.selectedChat}`, {})
        .then(
          (data: XMLHttpRequest) => {
            if (data.status === 401) {
              this.go('/login');
            } else {
              this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.currentUser}/${this.selectedChat}/${JSON.parse(data.responseText).token}`);

              this.socket.addEventListener('open', () => {
                console.log('Соединение установлено');
                this.socket.send(JSON.stringify({
                  content: '0',
                  type: 'get old'
                }));
                if (!this.pingInterval) this.pingInterval = setInterval(this.ping.bind(this), 1000);
              });

              this.socket.addEventListener('close', event => {
                if (event.wasClean) {
                  console.log('Соединение закрыто чисто');
                } else {
                  console.log('Обрыв соединения');
                }
                console.log(`Код: ${event.code} | Причина: ${event.reason}`);
              });

              this.socket.addEventListener('message', event => {
                if (JSON.parse(event.data).type !== 'pong') {
                  this.eventBus.emit('UpdateMessages', JSON.parse(event.data));
                }
              });
            }
          }
        );
    }
  }

  ping (): void {
    if (this.socket.readyState === 1) {
      this.socket.send(JSON.stringify({
        type: 'ping'
      }));
    }
  }

  use (pathname: string, block: TBlockClass, props: TProps): Router {
    const route = new Route(pathname, block, props);

    this.routes.push(route);
    return this;
  }

  start (): void {
    window.onpopstate = event => {
      this._onRoute((<typeof window>event.currentTarget).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute (pathname: string, params = ''): void {
    let route = this.getRoute(pathname);
    if (!route) {
      route = this.getRoute('/err404');
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    if (typeof (route) !== 'undefined') route._params = params;

    this._currentRoute = route;
    route?.render();
  }

  go (pathname: string, params = ''): void {
    try {
      this.history.pushState({}, '', pathname);
    } catch (e) {
      // не можем управлять объектом history
    } finally {
      this._onRoute(pathname, params);
    }
  }

  getRoute (pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }
}
