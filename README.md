## Описание

Проект Sprint_4. Четвертый этап создания прототипа чата. Данный проект является учебным проектом YP.

Ссылка на актуальный pull-request (Sprint 4): https://github.com/Totentu/middle.messenger.praktikum.yandex/pull/18

Демонстрация работы данного прототипа: https://tnt-yp-sprint4.herokuapp.com/

Проект является рабочим в достаточной степени. Его публикация позволяет двум
пользователями зарегистрироваться, один из них может создать новый чат, включить второго в него и вести переписку. 

Использованные инструменты:
- Шаблонизатор: Handlebars.
- Сборщик: Webpack.
- Линт файлов: ESLint, StyleLint.
- Тестирование: Mocha.
- Контейнеризация: Docker.
- Публикация: Heroku.

## Команды

- `npm run build` — сборка проекта,
- `npm run start` — запуск проекта на порту 3000,
- `npm run test`  — запуск тестирования проекта.

## Описание структуры проекта

В корне находится пустой index.html, к которому подключен index.ts.

В соответствии с ТЗ, все элементы html страниц формируются из блоков, на основе класса Block.
Введены три уровня организации блоков: страницы, панели, компоненты (соответствуют папкам pages, panels, components).

Для описания стилей выбран SCSS. Итоговый файл index.scss находится в папке static и является сборщиков всех scss-файлов
элементов проекта, а также выделенного для общих элементов стилей файла global.scss.

В папке common находятся общие для все блоков элементы, а именно:
- Классы Block и EventBus (block.ts, event_bus.ts) - базовые классы всех элементов.
- Утилиты (utils.ts) - общие функции, используемые различными элементами.
- Константы (constants.ts) - общие константы, используемые различными элементами.
- Класс для работы с запросами (httptransport.ts).
- Классы router.ts и route.ts.

Особенности реализации

- Для реализации интерактивности каждой компоненты при сборке страниц, включающих компоненты меньшего уровня
  я создал специальную функцию ConstructDomTree (utils.ts). Внутри шаблона я делаю псевдо-узлы "node" с id,
  которые соответствуют компонентам. Handlebars ничего об этом не знает, поэтому просто их оставляет как есть.
  После того как он возвращает строку я перевожу ее в DOM дерево, в котором ищу мои псевдо-узлы и заменяю
  их на компоненты. Соответственно render возвращает обратно в block не строку, а DOM структуру.

- Для реализации всех страниц, собирающих или демонстрирующих поля с информацией (вход в систему, регистрация,
  параметры пользователя, изменение данных, изменение пароля) создан один тип страницы - form. Этот тип принимает
  набор полей и кнопок как параметры, после чего формирует страницу. В рамках этой страницы реализован единый механизм
  валидации данных, на основе констант регулярных выражений (constants.ts)

- Центральным диспетчером в проекте является объект router, создаваемые в index.ts. Он может быть импортирован в любой 
  компонент проекта, предоставляя ему: 
  - Возможность совершать переходы по страницам;
  - Общую шину событий (EventBus), которую используют различные компоненты;
  - Значения, необходимые различными компонентам, такие как selectedChat или currentUser;
  - Socket для обмена мгновенными сообщениями.

- В проекте реализовано тестирование, на примере объекта router. Два теста проверяют корректную работу history.length
  при совершении переходов, а также корректный выброс ошибки 404 при попытке выйти на неизвестный адрес. 


