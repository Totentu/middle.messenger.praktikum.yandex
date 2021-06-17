import {VALIDATE_FORM} from '../common/constants';

export const LoginDataTmp = {
  fields: [
    {field_title: 'Логин', field_name: 'login', field_value: 'petr_12646783', errMes: VALIDATE_FORM.login.errMes, regControl: VALIDATE_FORM.login.regControl},
    {field_title: 'Пароль', field_name: 'password', field_value: '123456', errMes: VALIDATE_FORM.password.errMes, regControl: VALIDATE_FORM.password.regControl}
  ],
  buttons: [
    {button_title: 'Войти', button_name: 'btnLogin', button_href: 'main.html', type: 'submit'},
    {button_title: 'Регистрация', button_name: 'btnRegistry', button_href: 'registry.html', type: 'href'}
  ],
  title: 'Авторизация',
  disabled: false
};
