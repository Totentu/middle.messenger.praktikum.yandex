import {VALIDATE_FORM} from '../common/constants';

export const ProfileChangeDataTmp = {
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
    {button_title: 'Отмена', button_name: 'btnCancel', button_href: '/profile.html', type: 'href'}
  ],
  title: 'Изменение данных',
  disabled: false
};
