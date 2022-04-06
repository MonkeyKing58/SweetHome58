export default {

  'before-login': {
    message: 'Войдите в систему',
    type: 'warning'
  },

  'logout': {
    message: 'Вы вышли из системы',
    type: 'warning'
  },

  'auth/user-not-found': {
    message: 'Пользователь с таким Email не найден',
    type: 'error'
  },

  'auth/wrong-password': {
    message: 'Неправильный пароль',
    type: 'error'
  },

  'auth/email-already-in-use': {
    message: 'Такой Email уже используется',
    type: 'error'
  },

  'login': {
    message: 'Вы вошли в ЛК',
    type: 'success'
  },

  'register': {
    message: 'Вы зарегистрировались и вошли в ЛК',
    type: 'success'
  },

  'flat_has_been_updated': {
    message: 'Информация о квартире обновлена',
    type: 'success'
  },

  'flat_has_been_created': {
    message: 'Квартира добавлена',
    type: 'success'
  },

  'flat_has_been_created_fail': {
    message: 'Не удалось добавить квартиру',
    type: 'error'
  },

  'flat_has_been_deleted': {
    message: 'Квартира удалена',
    type: 'success'
  }

}