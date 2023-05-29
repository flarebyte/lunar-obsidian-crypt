import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lizardSign} from '../src/lizard-sign.js';

const encodeSecret = (secret: string): Uint8Array =>
  new TextEncoder().encode(secret);

const lizard = lizardSign('test', {
  kind: 'lizard',
  title: 'testing Gecko',
  secret: encodeSecret('terrible-password'),
  expiration: {
    value: 2,
    unit: 'seconds',
  },
  strength: 'good',
});

test('lizardSign', async () => {
  const actual = await lizard({id: 'lunar123'});
  assert.deepEqual(actual, '');
});
