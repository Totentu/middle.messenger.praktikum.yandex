import {VALIDATE_FORM} from '../common/constants';

export const LoginFormData = {
  fields: [
    {field_title: 'Логин', field_name: 'login', field_value: '', errMes: VALIDATE_FORM.login.errMes, regControl: VALIDATE_FORM.login.regControl},
    {field_title: 'Пароль', field_name: 'password', field_value: '', errMes: VALIDATE_FORM.password.errMes, regControl: VALIDATE_FORM.password.regControl}
  ],
  buttons: [
    {button_title: 'Войти', button_name: 'btnLogin', button_href: '/main', type: 'submit', apiKey: '/auth/signin', apiMethod: 'post'},
    {button_title: 'Регистрация', button_name: 'btnRegistry', button_href: '/registry', type: 'href'}
  ],
  title: 'Авторизация',
  disabled: false
};
