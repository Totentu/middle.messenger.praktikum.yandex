const express = require('express');

const app = express();

app.set('view engine', 'hbs');
app.set('views', 'static');

app.use('/registry', function (request, response) {
    response.render('registry.hbs', {
        fields: [
            {field_title: 'Почта',      field_name: 'email',        field_value: ''},
            {field_title: 'Логин',      field_name: 'login',        field_value: ''},
            {field_title: 'Пароль',     field_name: 'password',     field_value: ''},
            {field_title: 'Имя',        field_name: 'first_name',   field_value: ''},
            {field_title: 'Фамилия',    field_name: 'second_name',  field_value: ''},
            {field_title: 'Телефон',    field_name: 'phone',        field_value: ''},
        ],
        title: 'Регистрация',
    })
});

app.use('/profile', function (request, response) {
    response.render('profile.hbs', {
        fields: [
            {field_title: 'Почта',      field_name: 'email',        field_value: 'pochta@yandex.ru'},
            {field_title: 'Логин',      field_name: 'login',        field_value: 'petr_12646783'},
            {field_title: 'Имя',        field_name: 'first_name',   field_value: 'Петренко'},
            {field_title: 'Фамилия',    field_name: 'second_name',  field_value: 'RocketMan'},
            {field_title: 'Телефон',    field_name: 'phone',        field_value: '+7(909)967-30-30'},
        ],
        user_photo: 'pic3.jpg',
        title: 'Профиль',
    })
});

app.use('/profile_change_data', function (request, response) {
    response.render('profile_change_data.hbs', {
        fields: [
            {field_title: 'Почта',      field_name: 'email',        field_value: 'pochta@yandex.ru'},
            {field_title: 'Логин',      field_name: 'login',        field_value: 'petr_12646783'},
            {field_title: 'Имя',        field_name: 'first_name',   field_value: 'Петренко'},
            {field_title: 'Фамилия',    field_name: 'second_name',  field_value: 'RocketMan'},
            {field_title: 'Телефон',    field_name: 'phone',        field_value: '+7(909)967-30-30'},
        ],
        title: 'Изменение данных',
    })
});

app.use('/profile_change_pass', function (request, response) {
    response.render('profile_change_pass.hbs', {
        fields: [
            {field_title: 'Текущий пароль',      field_name: 'old_pass',        field_value: ''},
            {field_title: 'Новый пароль',        field_name: 'new_pass',        field_value: ''},
            {field_title: 'Повтор пароля',       field_name: 'dbl_pass',        field_value: ''},
        ],
        title: 'Изменение данных',
    })
});

app.use('/login', function (request, response) {
    response.render('login.hbs', {
        fields: [
            {field_title: 'Логин',      field_name: 'login',        field_value: ''},
            {field_title: 'Пароль',     field_name: 'password',     field_value: ''},
        ],
        title: 'Авторизация',
    })
});

app.use('/main', function (request, response) {
    response.render('main.hbs', {
        chats: [
            {chat_title: 'Беседа 1',      chat_photo: 'pic1.jpg',        chat_text: 'Начало беседы...',        chat_time: '15:04',        chat_new: 2},
            {chat_title: 'Беседа 2',      chat_photo: 'pic2.jpg',        chat_text: 'Начало беседы...',        chat_time: '16:04',        chat_new: null},
            {chat_title: 'Беседа 3',      chat_photo: 'pic3.jpg',        chat_text: 'Начало беседы...',        chat_time: '17:04',        chat_new: 3},
            {chat_title: 'Беседа 4',      chat_photo: 'pic4.jpg',        chat_text: 'Начало беседы...',        chat_time: '18:04',        chat_new: 1},
            {chat_title: 'Беседа 5',      chat_photo: 'pic5.jpg',        chat_text: 'Начало беседы...',        chat_time: '19:04',        chat_new: null},
        ],
        messages: [],
    })
});

app.use(express.static('./'));


app.listen(3000);