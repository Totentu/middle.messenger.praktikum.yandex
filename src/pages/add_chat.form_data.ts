import {VALIDATE_FORM} from '../common/constants';

export const AddChatTmp = {
  fields: [
    {field_title: 'Название новой беседы', field_name: 'title', field_value: 'Новая беседа', errMes: VALIDATE_FORM.chat_name.errMes, regControl: VALIDATE_FORM.chat_name.regControl}
  ],
  buttons: [
    {button_title: 'Создать', button_name: 'btnCreate', button_href: '/main', type: 'submit', apiKey: '/chats', apiMethod: 'post'},
    {button_title: 'Отмена', button_name: 'btnCancel', button_href: '/main', type: 'href'}
  ],
  title: 'Создание новой беседы',
  disabled: false
};
