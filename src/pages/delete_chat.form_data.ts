
export const DelChatTmp = {
  fields: [
    {field_title: 'ID', field_name: 'chatId', field_value: '0'},
    {field_title: 'Название беседы', field_name: 'title', field_value: 'Новая беседа'}
  ],
  buttons: [
    {button_title: 'Удалить', button_name: 'btnDelete', button_href: '/main', type: 'submit', apiKey: '/chats', apiMethod: 'delete'},
    {button_title: 'Отмена', button_name: 'btnCancel', button_href: '/main', type: 'href'}
  ],
  title: 'Удаление беседы',
  disabled: true
};
