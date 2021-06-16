import {PageMain} from './pages/main/index';
import {PageForm} from './pages/form/index';
import HTTPTransport from './common/httptransport';
import {ProfileDataTmp} from './pages/profile.tmp';
import {ProfileChangeDataTmp} from './pages/profile_change.tmp';
import {PasswordChangeDataTmp} from './pages/password_change.tmp';
import {RegistryDataTmp} from './pages/registry.tmp';
import {LoginDataTmp} from './pages/login.tmp';

const searchString = new URLSearchParams(window.location.search);
const currentTemplate = searchString.get('template');
let page: string;

currentTemplate != null ? page = '/' + currentTemplate : page = document.location.pathname;
let pageDOM;

switch (page) {
  case '/main.html':
    pageDOM = new PageMain();
    break;
  case '/profile.html':
    pageDOM = new PageForm(ProfileDataTmp);
    break;
  case '/profile_change_data.html':
    pageDOM = new PageForm(ProfileChangeDataTmp);
    break;
  case '/profile_change_pass.html':
    pageDOM = new PageForm(PasswordChangeDataTmp);
    break;
  case '/registry.html':
    pageDOM = new PageForm(RegistryDataTmp);
    break;
  default:
    pageDOM = new PageForm(LoginDataTmp);
    break;
}

document.querySelector('#root')?.append(pageDOM.element);

// Тестирование работы запросов
const divTest = document.querySelector('#proxy_test');
if (divTest !== null) divTest.textContent = 'Отправка запроса через 1 секунду.';
const HTTP = new HTTPTransport();
setTimeout(() => {
  HTTP.get(page, {timeout: 5000}
  ).then(
    (data: XMLHttpRequest) => {
      if (divTest !== null) divTest.textContent += '\r\nОтвет получен. Статус : ' + data['status'];
      if (divTest !== null) divTest.textContent += '\r\n' + data['responseText'];
    }
  );
}, 1000);
