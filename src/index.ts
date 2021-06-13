import {PageMain} from './pages/main/index';
import {PageForm} from './pages/form/index';
import HTTPTransport from './common/xhr';
import {VALIDATE_FORM} from './common/constants';

const searchString = new URLSearchParams(window.location.search);
const currentTemplate = searchString.get('template');
let page;

currentTemplate != null ? page = '/' + currentTemplate : page = document.location.pathname;

let pageData, pageDOM;

switch (page) {
  case '/main.html':
    pageData = {};
    pageDOM = new PageMain();
    break;
  case '/profile.html':
    pageData = {
      fields: [
        {field_title: 'Имя', field_name: 'first_name', field_value: 'Алексей'},
        {field_title: 'Фамилия', field_name: 'second_name', field_value: 'Петренко'},
        {field_title: 'Ник', field_name: 'display_name', field_value: 'RocketMan'},
        {field_title: 'Логин', field_name: 'login', field_value: 'petr_12646783'},
        {field_title: 'Почта', field_name: 'email', field_value: 'pochta@yandex.ru'},
        {field_title: 'Телефон', field_name: 'phone', field_value: '+7(909)967-30-30'}
      ],
      buttons: [
        {button_title: 'Изменить данные', button_name: 'btnChangeData', button_href: '/profile_change_data.html'},
        {button_title: 'Изменить пароль', button_name: 'btnChangePass', button_href: '/profile_change_pass.html'},
        {button_title: 'Вернуться', button_name: 'btnCancel', button_href: '/main.html'}
      ],
      title: 'Профиль',
      disabled: true
    };
    pageDOM = new PageForm(pageData);
    break;
  case '/profile_change_data.html':
    pageData = {
      fields: [
        {field_title: 'Имя', field_name: 'first_name', field_value: 'Алексей', errMes: VALIDATE_FORM.any_name.errMes, regControl: VALIDATE_FORM.any_name.regControl},
        {field_title: 'Фамилия', field_name: 'second_name', field_value: 'Петренко', errMes: VALIDATE_FORM.any_name.errMes, regControl: VALIDATE_FORM.any_name.regControl},
        {field_title: 'Ник', field_name: 'display_name', field_value: 'RocketMan', errMes: VALIDATE_FORM.nick.errMes, regControl: VALIDATE_FORM.nick.regControl},
        {field_title: 'Логин', field_name: 'login', field_value: 'petr_12646783', errMes: VALIDATE_FORM.login.errMes, regControl: VALIDATE_FORM.login.regControl},
        {field_title: 'Почта', field_name: 'email', field_value: 'pochta@yandex.ru', errMes: VALIDATE_FORM.email.errMes, regControl: VALIDATE_FORM.email.regControl},
        {field_title: 'Телефон', field_name: 'phone', field_value: '+7(909)967-30-30', errMes: VALIDATE_FORM.phone.errMes, regControl: VALIDATE_FORM.phone.regControl}
      ],
      buttons: [
        {button_title: 'Сохранить', button_name: 'btnSave', button_href: '/profile.html', type: 'submit'},
        {button_title: 'Отмена', button_name: 'btnCancel', button_href: '/profile.html'}
      ],
      title: 'Изменение данных'
    };
    pageDOM = new PageForm(pageData);
    break;
  case '/profile_change_pass.html':
    pageData = {
      fields: [
        {field_title: 'Старый пароль', field_name: 'oldPassword', field_value: '123456', errMes: VALIDATE_FORM.password.errMes, regControl: VALIDATE_FORM.password.regControl},
        {field_title: 'Новый пароль', field_name: 'newPassword', field_value: '654321', errMes: VALIDATE_FORM.password.errMes, regControl: VALIDATE_FORM.password.regControl}
      ],
      buttons: [
        {button_title: 'Сохранить', button_name: 'btnSave', button_href: '/profile.html', type: 'submit'},
        {button_title: 'Отмена', button_name: 'btnCancel', button_href: '/profile.html'}
      ],
      title: 'Изменение пароля'
    };
    pageDOM = new PageForm(pageData);
    break;
  case '/registry.html':
    pageData = {
      fields: [
        {field_title: 'Почта', field_name: 'email', field_value: '', errMes: VALIDATE_FORM.email.errMes, regControl: VALIDATE_FORM.email.regControl},
        {field_title: 'Логин', field_name: 'login', field_value: '', errMes: VALIDATE_FORM.login.errMes, regControl: VALIDATE_FORM.login.regControl},
        {field_title: 'Пароль', field_name: 'password', field_value: '', errMes: VALIDATE_FORM.password.errMes, regControl: VALIDATE_FORM.password.regControl},
        {field_title: 'Имя', field_name: 'first_name', field_value: '', errMes: VALIDATE_FORM.any_name.errMes, regControl: VALIDATE_FORM.any_name.regControl},
        {field_title: 'Фамилия', field_name: 'second_name', field_value: '', errMes: VALIDATE_FORM.any_name.errMes, regControl: VALIDATE_FORM.any_name.regControl},
        {field_title: 'Телефон', field_name: 'phone', field_value: '', errMes: VALIDATE_FORM.phone.errMes, regControl: VALIDATE_FORM.phone.regControl}
      ],
      buttons: [
        {button_title: 'Зарегистрироваться', button_name: 'btnRegistry', button_href: 'main.html', type: 'submit'},
        {button_title: 'Отмена', button_name: 'btnCancel', button_href: 'login.html'}
      ],
      title: 'Регистрация'
    };
    pageDOM = new PageForm(pageData);
    break;
  default:
    pageData = {
      fields: [
        {field_title: 'Логин', field_name: 'login', field_value: 'petr_12646783', errMes: VALIDATE_FORM.login.errMes, regControl: VALIDATE_FORM.login.regControl},
        {field_title: 'Пароль', field_name: 'password', field_value: '123456', errMes: VALIDATE_FORM.password.errMes, regControl: VALIDATE_FORM.password.regControl}
      ],
      buttons: [
        {button_title: 'Войти', button_name: 'btnLogin', button_href: 'main.html', type: 'submit'},
        {button_title: 'Регистрация', button_name: 'btnRegistry', button_href: 'registry.html'}
      ],
      title: 'Авторизация'
    };
    pageDOM = new PageForm(pageData);
    break;
}

document.querySelector('#root').append(pageDOM._element);

// Тестирование работы запросов
document.querySelector('#proxy_test').textContent = 'Отправка запроса через 1 секунду.';
const HTTP = new HTTPTransport();
setTimeout(() => {
  HTTP.get(page
  ).then(
    (data) => {
      document.querySelector('#proxy_test').textContent += '\r\nОтвет получен. Статус : ' + data['status'];
      document.querySelector('#proxy_test').textContent += '\r\n' + data['responseText'];
    }
  );
}, 1000);
