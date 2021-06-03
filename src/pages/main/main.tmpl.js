import {template as top_panelTemplate} from '../../components/top_panel/top_panel.tmpl';
import {template as left_panelTemplate} from '../../components/left_panel/left_panel.tmpl';
import {template as mes_panelTemplate} from '../../components/mes_panel/mes_panel.tmpl';
import {template as write_panelTemplate} from '../../components/write_panel/write_panel.tmpl';

let top_panel_tmpl = Handlebars.compile(top_panelTemplate);
let left_panel_tmpl = Handlebars.compile(left_panelTemplate);
let mes_panel_tmpl = Handlebars.compile(mes_panelTemplate);
let write_panel_tmpl = Handlebars.compile(write_panelTemplate);

const left_panel_data={
    chats: [
        {chat_title: 'Беседа 1',      chat_photo: 'pic1',        chat_text: 'Начало беседы...',        chat_time: '15:04',        chat_new: 2},
        {chat_title: 'Беседа 2',      chat_photo: 'pic2',        chat_text: 'Начало беседы...',        chat_time: '16:04',        chat_new: 0},
        {chat_title: 'Беседа 3',      chat_photo: 'pic3',        chat_text: 'Начало беседы...',        chat_time: '17:04',        chat_new: 3},
        {chat_title: 'Беседа 4',      chat_photo: 'pic4',        chat_text: 'Начало беседы...',        chat_time: '18:04',        chat_new: 1},
        {chat_title: 'Беседа 5',      chat_photo: 'pic5',        chat_text: 'Начало беседы...',        chat_time: '19:04',        chat_new: 0},
    ],
};

const mes_panel_data={
    messages: [
        {mes_author: 'Автор',      mes_time: '11:45',        mes_text: `Люблю грозу в начале мая,
                                                                        Когда весенний, первый гром,
                                                                        Как бы резвяся и играя,
                                                                        Грохочет в небе голубом.
                                                                        
                                                                        Гремят раскаты молодые,
                                                                        Вот дождик брызнул, пыль летит,
                                                                        Повисли перлы дождевые,
                                                                        И солнце нити золотит.`},

        {mes_author: '',      mes_time: '11:45',        mes_text: 'Круто, а кто автор?'},
        {mes_author: 'Автор',      mes_time: '11:45',        mes_text: 'Эм... не знаю, просто и инете нашел '},
        {mes_author: '',      mes_time: '11:45',        mes_text: 'Ясно.'},
    ],
};


export const template=`

`+top_panel_tmpl()+`
`+left_panel_tmpl(left_panel_data)+`
`+mes_panel_tmpl(mes_panel_data)+`
`+write_panel_tmpl()+`
`