import {PageForm} from '../../components/form/index';
import {router} from '../../index';
import HTTPTransport from '../../common/httptransport';
import {template as pageProfileDataTemplate} from './profile_data.tmpl';
import Button from '../../components/button/index';
import Input from '../../components/input/index';

export default class ProfileData extends PageForm {
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
        {button_title: 'Изменить данные', button_name: 'btnChangeData', button_href: '/profile_change', type: 'href'},
        {button_title: 'Изменить пароль', button_name: 'btnChangePass', button_href: '/password_change', type: 'href'},
        {button_title: 'Вернуться', button_name: 'btnCancel', button_href: '/main', type: 'href'}
      ],
      title: 'Профиль',
      disabled: true
    };
    super(FormData, pageProfileDataTemplate);

    let id = 'btnSetAvatar';
    this.props.nodeElements[id] = new Button({class: 'form__button', href: '/', text: 'Изменить аватар', type: ''});
    this.props.nodeElements[id].setProps({
      events: {
        click: () => { this.setAvatar(); }
      }
    });
    this.props.buttonsNodes.push({button_title: 'Изменить аватар', button_node: `<node id=${id}></node>`});

    id = 'inpAvatar';
    this.props.nodeElements[id] = new Input({type: 'file', className: 'form__input_avatar', disabled: false, id: 'inpAvatar', value: ''});
    this.props.nodeElements[id].setProps({
      events: {
        change: () => { this.previewAvatar(); }
      }
    });

    this.props.avatar = '';
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
            router.go('/login');
          } else {
            const uData = JSON.parse(data.response);
            this.props.avatar = uData.avatar;
            this.props.fields = [
              {field_title: 'Имя', field_name: 'first_name', field_value: uData.first_name},
              {field_title: 'Фамилия', field_name: 'second_name', field_value: uData.second_name},
              {field_title: 'Ник', field_name: 'display_name', field_value: uData.display_name},
              {field_title: 'Логин', field_name: 'login', field_value: uData.login},
              {field_title: 'Почта', field_name: 'email', field_value: uData.email},
              {field_title: 'Телефон', field_name: 'phone', field_value: uData.phone}
            ];
            this.initFields();
            this._render();
          }
        }
      );
  }

  setAvatar (): void {
    const host = 'https://ya-praktikum.tech';
    const avatar = <HTMLInputElement>document.getElementById('inpAvatar');

    const form = new FormData();
    if (avatar.files !== null && avatar.files.length > 0) {
      form.append('avatar', avatar.files[0]);
      fetch(`${host}/api/v2/user/profile/avatar`, {
        method: 'PUT',
        credentials: 'include', // Нам нужно подставлять cookies
        mode: 'cors', // Работаем с CORS
        body: form
      })
        .then(response => response.json())
        .then(data => {
          this.props.avatar = data.avatar;
          this._render();
          return data;
        });
    } else {
      alert('Вы должны выбрать файл, чтобы изменить аватар');
    }
  }

  previewAvatar (): void {
    const avatar = <HTMLInputElement>document.getElementById('inpAvatar');
    if (avatar !== null && avatar.files !== null) {
      const files = avatar.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener('load', function () {
        const lblNewAvatar = <HTMLImageElement>document.getElementById('lblNewAvatar');
        lblNewAvatar.style.display = 'flex';
        const newAvatar = <HTMLImageElement>document.getElementById('newAvatar');
        newAvatar.style.display = 'flex';
        newAvatar.src = <string>(this.result);
      });
    }
  }
}
