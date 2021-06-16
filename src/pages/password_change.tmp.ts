import {VALIDATE_FORM} from '../common/constants';

export const PasswordChangeDataTmp = {
  fields: [
    {field_title: 'Старый пароль', field_name: 'oldPassword', field_value: '123456', errMes: VALIDATE_FORM.password.errMes, regControl: VALIDATE_FORM.password.regControl},
    {field_title: 'Новый пароль', field_name: 'newPassword', field_value: '654321', errMes: VALIDATE_FORM.password.errMes, regControl: VALIDATE_FORM.password.regControl}
  ],
  buttons: [
    {button_title: 'Сохранить', button_name: 'btnSave', button_href: '/profile.html', type: 'submit'},
    {button_title: 'Отмена', button_name: 'btnCancel', button_href: '/profile.html', type: 'href'}
  ],
  title: 'Изменение пароля',
  disabled: false
};
