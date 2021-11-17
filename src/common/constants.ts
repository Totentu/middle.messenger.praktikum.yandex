const VALIDATE_FORM = {
  login: {regControl: /^\w{6,}$/, errMes: 'Минимум 6 символов. Можно использовать латинские буквы, цифры и нижнее подчеркивание.'},
  password: {regControl: /^\w{8,}$/, errMes: 'Минимум 8 символов. Можно использовать латинские буквы, цифры и нижнее подчеркивание.'},
  any_name: {regControl: /^[А-Яа-я]{3,}$/, errMes: 'Минимум 3 символа. Только буквы русского алфавита.'},
  nick: {regControl: /^[_А-Яа-я0-9A-Za-z\-\s]{3,}$/, errMes: 'Минимум 3 символа. Любые буквы, цифры, пробелы, нижнее подчеркивание'},
  email: {regControl: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i, errMes: 'Введите корректный email'},
  phone: {regControl: /^\+\d\(\d{3}\)\d{3}-\d{2}-\d{2}$/, errMes: 'Введите номер телефона в формате +7(903)123-45-67'},
  message: {regControl: /^(?!.*\s+(ok|ок)(\s+|$))(\s|\S)+$/i, errMes: 'Не используйте слово "ok". Дайте эквивалентную оценку, например "хорошо" или "ясно".'},
  chat_name: {regControl: /^[_А-Яа-я0-9A-Za-z\-\s]{3,}$/, errMes: 'Минимум 3 символа. Любые буквы, цифры, пробелы, нижнее подчеркивание'}
};

export {VALIDATE_FORM};
