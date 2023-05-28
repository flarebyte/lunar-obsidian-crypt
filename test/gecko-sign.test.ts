import {test} from 'node:test';
import assert from 'node:assert/strict';
import {geckoSign} from '../src/gecko-sign.js';

const gecko = geckoSign('test', {
  a: 'sign',
  engine: 'gecko',
  title: 'testing Gecko',
  privateKey: 'terrible-password',
  expiration: {
    value: 2,
    unit: 'seconds',
  },
});

test('geckoSign', async () => {
  const actual = await gecko({id: 'lunar123'});
  assert.deepEqual(actual, '');
});
