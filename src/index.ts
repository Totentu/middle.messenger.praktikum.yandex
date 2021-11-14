import Router from './common/router';
import HTTPTransport from './common/httptransport';

import {PageMain} from './pages/main/index';
import {PageProfileData} from './pages/profile_data/index';
import {ChatUserAdd} from './pages/chat_user_add/index';
import {PageProfileDataChange} from './pages/profile_data_change/index';
import {PageProfilePassChange} from './pages/profile_pass_change/index';
import {PageForm} from './components/form/index';
import {PageErr404} from './pages/err404/index';

import {RegistryFormData} from './pages/registry.form_data';
import {LoginFormData} from './pages/login.form_data';
import {AddChatFormData} from './pages/add_chat.form_data';
import {DelChatFormData} from './pages/delete_chat.form_data';
import {DelUserFormData} from './pages/delete_user.form_data';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type TPropertyValue = any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type TBlockClass = any;
    type TProps = Record<string, TPropertyValue>;
    // eslint-disable-next-line no-var
    var router: Router;
}

window.router = new Router();

window.router
  .use('/', PageForm, LoginFormData)
  .use('/login', PageForm, LoginFormData)
  .use('/main', PageMain, {})
  .use('/profile', PageProfileData, {})
  .use('/profile_change', PageProfileDataChange, {})
  .use('/password_change', PageProfilePassChange, {})
  .use('/chat_user_add', ChatUserAdd, {})
  .use('/registry', PageForm, RegistryFormData)
  .use('/add_chat', PageForm, AddChatFormData)
  .use('/delete_chat', PageForm, DelChatFormData)
  .use('/delete_user', PageForm, DelUserFormData)
  .use('/err404', PageErr404, {})
  .start();

const HTTP = new HTTPTransport();
const host = 'https://ya-praktikum.tech';

HTTP.get(`${host}/api/v2/auth/user`, {})
  .then(
    (data: XMLHttpRequest) => {
      if (data.status === 401) {
        window.router.go('/login');
      } else {
        window.router.currentUser = JSON.parse(data.responseText).id;
        if (window.router._currentRoute?._pathname === '/login') {
          window.router.go('/main');
        }
      }
    }
  );

const searchString = new URLSearchParams(window.location.search);
const currentTemplate = searchString.get('template');
let page: string;

currentTemplate != null ? page = '/' + currentTemplate : page = document.location.pathname;
window.router.go(page);

export function hello (inStr: string): string {
  return 'Hello ' + inStr;
}
