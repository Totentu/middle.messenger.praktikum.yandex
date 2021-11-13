import Router from './common/router';
import HTTPTransport from './common/httptransport';

import {PageMain} from './pages/main/index';
import {PageProfileData} from './pages/profile_data/index';
import {ChatUserAdd} from './pages/chat_user_add/index';
import {PageProfileDataChange} from './pages/profile_data_change/index';
import {PageProfilePassChange} from './pages/profile_pass_change/index';
import {PageForm} from './components/form/index';
import {PageErr404} from './pages/err404/index';

import {RegistryDataTmp} from './pages/registry.form_data';
import {LoginDataTmp} from './pages/login.form_data';
import {AddChatTmp} from './pages/add_chat.form_data';
import {DelChatTmp} from './pages/delete_chat.form_data';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type TPropertyValue = any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type TBlockClass = any;
    type TProps = Record<string, TPropertyValue>;
}

window.router = new Router();

window.router
  .use('/', PageForm, LoginDataTmp)
  .use('/login', PageForm, LoginDataTmp)
  .use('/main', PageMain, {})
  .use('/profile', PageProfileData, {})
  .use('/profile_change', PageProfileDataChange, {})
  .use('/password_change', PageProfilePassChange, {})
  .use('/chat_user_add', ChatUserAdd, {})
  .use('/registry', PageForm, RegistryDataTmp)
  .use('/add_chat', PageForm, AddChatTmp)
  .use('/delete_chat', PageForm, DelChatTmp)
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
