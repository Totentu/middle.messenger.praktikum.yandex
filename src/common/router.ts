import Route from './route';
import EventBus from './event_bus';
import {GetCookie} from './utils';
import HTTPTransport from './httptransport';

export default class Router {
    private static __instance: Router;

    routes: Route[];
    history: typeof window.history;
    eventBus = new EventBus();
    lastChat: string | null;
    selectedChat = 0;
    currentUser = 0;
    currentToken = '';
    socket : WebSocket ;
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
      this.eventBus.on('UpdateUsers', this.connect.bind(this));

      Router.__instance = this;
    }

    connect (): void {
      console.log(this.selectedChat, this.currentUser, this.currentToken);
      if (this.selectedChat > 0 && this.currentUser) {
        const HTTP = new HTTPTransport();
        const host = 'https://ya-praktikum.tech';
        HTTP.post(`${host}/api/v2/chats/token/${this.selectedChat}`, {})
          .then(
            (data: XMLHttpRequest) => {
              if (data.status === 401) {
                this.go('/login');
              } else {
                this.currentToken = JSON.parse(data.responseText).token;
                this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${this.currentUser}/${this.selectedChat}/${this.currentToken}`);

                this.socket.addEventListener('open', () => {
                  console.log('Соединение установлено');
                  this.socket.send(JSON.stringify({
                    content: '0',
                    type: 'get old'
                  }));
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
                  this.eventBus.emit('UpdateMessages', JSON.parse(event.data));
                });
              }
            }
          );
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
      this.history.pushState({}, '', pathname);
      this._onRoute(pathname, params);
    }

    getRoute (pathname: string): Route | undefined {
      return this.routes.find(route => route.match(pathname));
    }
}
