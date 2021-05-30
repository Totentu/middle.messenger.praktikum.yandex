## Техническая информация

Ссылка на прототипы: 
https://www.figma.com/proto/EduXWeAso0ymv9iv5mOGcM/sprint_1?node-id=23%3A46&scaling=min-zoom&page-id=0%3A1

Ссылка на публикацию ветки deploy:
https://yp-7k-ivan-sprint-1.netlify.app/

Ссылка на PR для проверки:
https://github.com/Totentu/middle.messenger.praktikum.yandex/pull/10

## Описание  

Проект Sprint_1. Прототип чата.

Данный проект является учебным проектом YP.

## Команды

- `npm run build` — сборка проекта,
- `npm run start` — запуск проекта на порту 3000,

## Описание структуры проекта

Выбранный шаблонизатор - Handlebars.

В корне находится пустой index.html, к которому подключен index.js.

В index.js организован примитивный роутинг на основании пути входной ссылки. 
Роутинг не являлся частью этого задания, он сделан только для первичной демонстрации.
Для работы на netlify добавлен редирект всех статически страниц обратно на index.html c 
параметром шаблона.

Все итоговые html страницы собираются из небольших частей через import.
Шаблоны страниц лежат в ветке src/pages и импортируются в index.js
Шаблоны компонент, которые используются на страницах, лежат в различных ветках src/components и 
импортируются в шаблоны страниц. Если более сложная компонента использует более примитивные - они импортируются в нее.

Для описания стилей выбран SCSS. Итоговый файл index.scss находится в папке static и является сборщиков всех scss-файлов
компонентов и страниц проекта, а также выделенного для общих элементов стилей файла global.scss.



