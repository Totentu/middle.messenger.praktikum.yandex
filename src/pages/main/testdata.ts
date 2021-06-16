// Этот файл хранит бессмысленные данные для тестирования проекта
const TitleData = { title: 'Беседа 1', photo: 'pic1.jpg', time: 'был в сети 2 часа назад'};
const WriteData = { writeValue: 'Начал писать сообщение. ok'};
const MesData = [
  {
    tempID: 'mes1', author: 'Автор', time: '11:45', text: `Люблю грозу в начале мая,
                                                            Когда весенний, первый гром,
                                                            Как бы резвяся и играя,
                                                            Грохочет в небе голубом.
                                                            
                                                            Гремят раскаты молодые,
                                                            Вот дождик брызнул, пыль летит,
                                                            Повисли перлы дождевые,
                                                            И солнце нити золотит.`
  },
  {tempID: 'mes2', author: '', time: '11:45', text: 'Круто, а кто автор?'},
  {tempID: 'mes3', author: 'Автор', time: '11:45', text: 'Эм... не знаю, просто и инете нашел '},
  {tempID: 'mes4', author: '', time: '11:45', text: 'Ясно.'}
];
const ChatsData = [
  {tempID: 'chat1', title: 'Беседа 1', photo: 'pic1.jpg', text: 'Начало беседы...', time: '15:04', new: '2'},
  {tempID: 'chat2', title: 'Беседа 2', photo: 'pic2.jpg', text: 'Начало беседы...', time: '15:04', new: ''},
  {tempID: 'chat3', title: 'Беседа 3', photo: 'pic3.jpg', text: 'Начало беседы...', time: '15:04', new: '1'},
  {tempID: 'chat4', title: 'Беседа 4', photo: 'pic4.jpg', text: 'Начало беседы...', time: '15:04', new: '3'},
  {tempID: 'chat5', title: 'Беседа 5', photo: 'pic5.jpg', text: 'Начало беседы...', time: '15:04', new: ''}
];

export {ChatsData, MesData, TitleData, WriteData};
