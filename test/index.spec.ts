// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {} from './global';
import { expect } from 'chai';

import { hello } from '../src/index';

describe('Typescript + Babel usage suite', () => {
  it('should return string correctly', () => {
    expect(hello('mocha'), 'Hello mocha');
  });
});
