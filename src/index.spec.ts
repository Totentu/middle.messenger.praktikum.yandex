import {} from './global';
import { expect } from 'chai';
import { router } from './index';

describe('Проверка работы роутера', () => {
  it('Тест на два перехода', () => {
    const CurrentHistoryLength = router.history.length;
    router.go('/login');
    router.go('/registry');

    expect(router.history.length).to.eq(CurrentHistoryLength + 2);
  });

  it('Тест на переход в пустоту', () => {
    router.go('/asdfrtrerge');
    expect(router?._currentRoute?._pathname).to.eq('/err404');
  });
});
