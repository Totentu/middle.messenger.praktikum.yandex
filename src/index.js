import {MainPageTemplate}                   from "./pages/main/index";
import {LoginPageTemplate}                  from './pages/login/index';
import {RegistryPageTemplate}               from "./pages/registry/index";
import {ProfilePageTemplate}                from "./pages/profile/index";
import {ProfileChangeDataPageTemplate}      from "./pages/profile_change_data/index";
import {ProfileChangePassPageTemplate}      from "./pages/profile_change_pass/index";

let page=document.location.pathname;
let html="";
let page_html, page_data;

switch(page) {
    case '/main.html':
        page_html = Handlebars.compile(MainPageTemplate);
        page_data={};
        break;
    case '/registry.html':
        page_html = Handlebars.compile(RegistryPageTemplate);
        page_data={
            fields: [
                {field_title: 'Почта',      field_name: 'email',        field_value: 'pochta@yandex.ru'},
                {field_title: 'Логин',      field_name: 'login',        field_value: 'petr_12646783'},
                {field_title: 'Пароль',     field_name: 'password',     field_value: ''},
                {field_title: 'Имя',        field_name: 'first_name',   field_value: 'Алексей'},
                {field_title: 'Фамилия',    field_name: 'second_name',  field_value: 'Петренко'},
                {field_title: 'Телефон',    field_name: 'phone',        field_value: '+7(909)967-30-30'},
            ],
            title: 'Регистрация',
        };
        break;
    case '/profile.html':
        page_html = Handlebars.compile(ProfilePageTemplate);
        page_data={
            fields: [
                {field_title: 'Имя',        field_name: 'first_name',   field_value: 'Алексей'},
                {field_title: 'Фамилия',    field_name: 'second_name',  field_value: 'Петренко'},
                {field_title: 'Ник',        field_name: 'display_name', field_value: 'RocketMan'},
                {field_title: 'Логин',      field_name: 'login',        field_value: 'petr_12646783'},
                {field_title: 'Почта',      field_name: 'email',        field_value: 'pochta@yandex.ru'},
                {field_title: 'Телефон',    field_name: 'phone',        field_value: '+7(909)967-30-30'},
            ],
            title: 'Профиль',
        };
        break;
    case '/profile_change_data.html':
        page_html = Handlebars.compile(ProfileChangeDataPageTemplate);
        page_data={
            fields: [
                {field_title: 'Имя',        field_name: 'first_name',   field_value: 'Алексей'},
                {field_title: 'Фамилия',    field_name: 'second_name',  field_value: 'Петренко'},
                {field_title: 'Ник',        field_name: 'display_name', field_value: 'RocketMan'},
                {field_title: 'Логин',      field_name: 'login',        field_value: 'petr_12646783'},
                {field_title: 'Почта',      field_name: 'email',        field_value: 'pochta@yandex.ru'},
                {field_title: 'Телефон',    field_name: 'phone',        field_value: '+7(909)967-30-30'},
            ],
            title: 'Изменение данных',
        };
        break;
    case '/profile_change_pass.html':
        page_html = Handlebars.compile(ProfileChangePassPageTemplate);
        page_data={
            fields: [
                {field_title: 'Старый пароль',   field_name: 'oldPassword',   field_value: '123456'},
                {field_title: 'Новый пароль',    field_name: 'newPassword',   field_value: '654321'},
            ],
            title: 'Изменение пароля',
        };
        break;
    default:
        page_html = Handlebars.compile(LoginPageTemplate);
        page_data={
            fields: [
                {field_title: 'Логин',      field_name: 'login',        field_value: 'petr_12646783'},
                {field_title: 'Пароль',     field_name: 'password',     field_value: '123456'},
            ],
            title: 'Авторизация',
        };
        break;
}

html+=page_html(page_data);

document.querySelector("#root").innerHTML=html;
