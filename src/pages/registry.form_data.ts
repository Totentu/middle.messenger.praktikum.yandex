import {VALIDATE_FORM} from '../common/constants';

export const RegistryDataTmp = {
  fields: [
    {field_title: 'Почта', field_name: 'email', field_value: 'test_01@yandex.ru', errMes: VALIDATE_FORM.email.errMes, regControl: VALIDATE_FORM.email.regControl},
    {field_title: 'Логин', field_name: 'login', field_value: 'test_01', errMes: VALIDATE_FORM.login.errMes, regControl: VALIDATE_FORM.login.regControl},
    {field_title: 'Пароль', field_name: 'password', field_value: '01qweasd', errMes: VALIDATE_FORM.password.errMes, regControl: VALIDATE_FORM.password.regControl},
    {field_title: 'Ник', field_name: 'display_name', field_value: 'nick_01', errMes: VALIDATE_FORM.nick.errMes, regControl: VALIDATE_FORM.nick.regControl},
    {field_title: 'Имя', field_name: 'first_name', field_value: 'ТестИмя', errMes: VALIDATE_FORM.any_name.errMes, regControl: VALIDATE_FORM.any_name.regControl},
    {field_title: 'Фамилия', field_name: 'second_name', field_value: 'ТестФамилия', errMes: VALIDATE_FORM.any_name.errMes, regControl: VALIDATE_FORM.any_name.regControl},
    {field_title: 'Телефон', field_name: 'phone', field_value: '+7(903)123-45-67', errMes: VALIDATE_FORM.phone.errMes, regControl: VALIDATE_FORM.phone.regControl}
  ],
  buttons: [
    {button_title: 'Зарегистрироваться', button_name: 'btnRegistry', button_href: '/main', type: 'submit', apiKey: '/auth/signup', apiMethod: 'post'},
    {button_title: 'Отмена', button_name: 'btnCancel', button_href: '/login', type: 'href'}
  ],
  title: 'Регистрация',
  disabled: false
};
