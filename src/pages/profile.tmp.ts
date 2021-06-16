export const ProfileDataTmp = {
  fields: [
    {field_title: 'Имя', field_name: 'first_name', field_value: 'Алексей'},
    {field_title: 'Фамилия', field_name: 'second_name', field_value: 'Петренко'},
    {field_title: 'Ник', field_name: 'display_name', field_value: 'RocketMan'},
    {field_title: 'Логин', field_name: 'login', field_value: 'petr_12646783'},
    {field_title: 'Почта', field_name: 'email', field_value: 'pochta@yandex.ru'},
    {field_title: 'Телефон', field_name: 'phone', field_value: '+7(909)967-30-30'}
  ],
  buttons: [
    {button_title: 'Изменить данные', button_name: 'btnChangeData', button_href: '/profile_change_data.html', type: 'href'},
    {button_title: 'Изменить пароль', button_name: 'btnChangePass', button_href: '/profile_change_pass.html', type: 'href'},
    {button_title: 'Вернуться', button_name: 'btnCancel', button_href: '/main.html', type: 'href'}
  ],
  title: 'Профиль',
  disabled: true
};
