import {PageForm} from '../../components/form/index';
// import {router} from '../../index';
import HTTPTransport from '../../common/httptransport';
import {VALIDATE_FORM} from '../../common/constants';

export default class ProfileDataChange extends PageForm {
  constructor () {
    const FormData = {
      fields: [
        {field_title: 'Имя', field_name: 'first_name', field_value: ''},
        {field_title: 'Фамилия', field_name: 'second_name', field_value: ''},
        {field_title: 'Ник', field_name: 'display_name', field_value: ''},
        {field_title: 'Логин', field_name: 'login', field_value: ''},
        {field_title: 'Почта', field_name: 'email', field_value: ''},
        {field_title: 'Телефон', field_name: 'phone', field_value: ''}
      ],
      buttons: [
        {button_title: 'Сохранить', button_name: 'btnSave', button_href: '/profile', type: 'submit', apiKey: '/user/profile', apiMethod: 'put'},
        {button_title: 'Отмена', button_name: 'btnCancel', button_href: '/profile', type: 'href'}
      ],
      title: 'Изменение данных',
      disabled: false
    };
    super(FormData);
    this.getUserData();
  }

  getUserData (): void {
    const HTTP = new HTTPTransport();
    const host = 'https://ya-praktikum.tech';

    HTTP.get(`${host}/api/v2/auth/user`, {})
      .then(
        (data: XMLHttpRequest) => {
          if (data.status === 401) {
            console.log('Пользователь не идентифицирован');
            window.router.go('/login');
          } else {
            const uData = JSON.parse(data.response);
            this.props.fields = [
              {field_title: 'Имя', field_name: 'first_name', field_value: uData.first_name, errMes: VALIDATE_FORM.any_name.errMes, regControl: VALIDATE_FORM.any_name.regControl},
              {field_title: 'Фамилия', field_name: 'second_name', field_value: uData.second_name, errMes: VALIDATE_FORM.any_name.errMes, regControl: VALIDATE_FORM.any_name.regControl},
              {field_title: 'Ник', field_name: 'display_name', field_value: uData.display_name, errMes: VALIDATE_FORM.nick.errMes, regControl: VALIDATE_FORM.nick.regControl},
              {field_title: 'Логин', field_name: 'login', field_value: uData.login, errMes: VALIDATE_FORM.login.errMes, regControl: VALIDATE_FORM.login.regControl},
              {field_title: 'Почта', field_name: 'email', field_value: uData.email, errMes: VALIDATE_FORM.email.errMes, regControl: VALIDATE_FORM.email.regControl},
              {field_title: 'Телефон', field_name: 'phone', field_value: uData.phone, errMes: VALIDATE_FORM.phone.errMes, regControl: VALIDATE_FORM.phone.regControl}
            ];
            this.initFields();
            this._render();
          }
        }
      );
  }
}
