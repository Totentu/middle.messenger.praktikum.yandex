import {PageForm} from '../../components/form/index';
import {router} from '../../index';
import HTTPTransport from '../../common/httptransport';
import {template as pageChatUserAddTemplate} from './chat_user_add.tmpl';
import Button from '../../components/button/index';
import Input from '../../components/input/index';

export default class ChatUserAdd extends PageForm {
  constructor () {
    const FormData = {
      fields: [
      ],
      buttons: [
      ],
      title: 'Добавление участника беседы',
      disabled: true
    };
    super(FormData, pageChatUserAddTemplate);

    let id = 'btnSearch';
    this.props.nodeElements[id] = new Button({class: 'form__button', href: '/', text: 'Найти участника', type: ''});
    this.props.nodeElements[id].setProps({
      events: {
        click: () => { this.searchUser(); }
      }
    });

    id = 'btnAddUser';
    this.props.nodeElements[id] = new Button({class: 'form__button', href: '/', text: 'Добавить участника', type: ''});
    this.props.nodeElements[id].setProps({
      events: {
        click: () => { this.addUser(); }
      }
    });

    this.props.UserID = 0;

    id = 'inpSearch';
    this.props.nodeElements[id] = new Input({type: '', className: 'form__input', disabled: false, id: 'inpSearch', value: ''});

    this.initFields();
    this._render();
  }

  searchUser (): void {
    const search = <HTMLInputElement>document.getElementById('inpSearch');
    const HTTP = new HTTPTransport();
    const host = 'https://ya-praktikum.tech';
    HTTP.post(`${host}/api/v2/user/search`, { data: {login: search.value} })
      .then(
        (data: XMLHttpRequest) => {
          if (data.status === 401) {
            console.log('Пользователь не идентифицирован');
            router.go('/login');
          } else {
            const uData = JSON.parse(data.response)[0];
            this.props.UserID = uData.id;
            this.props.fields = [
              {field_title: 'ID участника', field_name: 'users', field_value: uData.id},
              {field_title: 'ID чата', field_name: 'chatId', field_value: router.selectedChat},
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

  addUser (): void {
    const SendData = {users: <number[]>[this.props.UserID], chatId: router.selectedChat };
    const HTTP = new HTTPTransport();
    const host = 'https://ya-praktikum.tech';
    HTTP.put(`${host}/api/v2/chats/users`, { data: SendData})
      .then(
        (data: XMLHttpRequest) => {
          if (data.status === 401) {
            console.log('Пользователь не идентифицирован');
            router.go('/login');
          } else if (data.status === 400) {
            // console.log(data.response);
          } else {
            router.go('/main');
          }
        }
      );
  }
}
