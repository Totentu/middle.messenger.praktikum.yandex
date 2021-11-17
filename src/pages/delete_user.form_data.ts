export const DelUserFormData = {
  fields: [
    {field_title: 'ID чата', field_name: 'chatId', field_value: '0'},
    {field_title: 'ID', field_name: 'users', field_value: '0'},
    {field_title: 'Имя', field_name: 'display_name', field_value: ''}
  ],
  buttons: [
    {button_title: 'Удалить', button_name: 'btnDelete', button_href: '/main', type: 'submit', apiKey: '/chats/users', apiMethod: 'delete'},
    {button_title: 'Отмена', button_name: 'btnCancel', button_href: '/main', type: 'href'}
  ],
  title: 'Удаление участника',
  disabled: true
};
