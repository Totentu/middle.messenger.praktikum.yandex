import {PageForm} from '../../components/form/index';
import {VALIDATE_FORM} from '../../common/constants';

export default class ProfilePassChange extends PageForm {
  constructor () {
    const FormData = {
      fields: [
        {field_title: 'Текущий пароль', field_name: 'oldPassword', field_value: '', errMes: VALIDATE_FORM.password.errMes, regControl: VALIDATE_FORM.password.regControl},
        {field_title: 'Новый пароль', field_name: 'newPassword', field_value: '', errMes: VALIDATE_FORM.password.errMes, regControl: VALIDATE_FORM.password.regControl}
      ],
      buttons: [
        {button_title: 'Сохранить', button_name: 'btnSave', button_href: '/profile', type: 'submit', apiKey: '/user/password', apiMethod: 'put'},
        {button_title: 'Отмена', button_name: 'btnCancel', button_href: '/profile', type: 'href'}
      ],
      title: 'Изменение пароля',
      disabled: false
    };
    super(FormData);
  }
}
