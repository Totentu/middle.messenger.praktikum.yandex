// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {} from './global';
import { expect } from 'chai';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { router } from '../src';

describe('Проверка работы роутера', () => {
  it('Тест на два перехода', () => {
    const CurrentHistoryLength = router.history.length
    router.go('/login');
    router.go('/registry');

    expect(router.history.length).to.eq(CurrentHistoryLength + 2);
  });

  it('Тест на переход в пустоту', () => {
    router.go('/asdfrtrerge');
    expect(router?._currentRoute?._pathname).to.eq('/err404');
  });
});

