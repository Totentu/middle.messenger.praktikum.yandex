
import {MainPageTemplate}       from "./pages/main/index";
import {LoginPageTemplate}      from './pages/login/index';
import {RegistryPageTemplate}   from "./pages/registry/index";

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
                {field_title: 'Почта',      field_name: 'email',        field_value: ''},
                {field_title: 'Логин',      field_name: 'login',        field_value: ''},
                {field_title: 'Пароль',     field_name: 'password',     field_value: ''},
                {field_title: 'Имя',        field_name: 'first_name',   field_value: ''},
                {field_title: 'Фамилия',    field_name: 'second_name',  field_value: ''},
                {field_title: 'Телефон',    field_name: 'phone',        field_value: ''},
            ],
            title: 'Регистрация',
        };
        break;
    case '/login.html':
    case '/':
        page_html = Handlebars.compile(LoginPageTemplate);
        page_data={
            fields: [
                {field_title: 'Логин',      field_name: 'login',        field_value: ''},
                {field_title: 'Пароль',     field_name: 'password',     field_value: ''},
            ],
            title: 'Авторизация',
        };
        break;
    default:
        const express = require('express');
        const app = express();
        app.use(express.static('./'));

        break;
}

html+=page_html(page_data);

document.querySelector("#root").innerHTML=html;
