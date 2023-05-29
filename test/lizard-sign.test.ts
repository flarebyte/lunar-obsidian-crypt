import {test} from 'node:test';
import {lizardSign} from '../src/lizard-sign.js';
import {assertSuccessfulResultFormat} from './assert-utils.js';

const encodeSecret = (secret: string): Uint8Array =>
  new TextEncoder().encode(secret);

export const assertOpts = {
  stringify: true,
};
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
const lizardGood = lizardSign('test', {
  kind: 'lizard',
  title: 'testing Gecko',
  secret: encodeSecret('terrible-password'),
  expiration: {
    value: 2,
    unit: 'seconds',
  },
  strength: 'good',
});

const lizardStrong = lizardSign('test', {
  kind: 'lizard',
  title: 'testing Gecko',
  secret: encodeSecret('terrible-password'),
  expiration: {
    value: 2,
    unit: 'seconds',
  },
  strength: 'strong',
});

const looksLikeJwt = (prefix: string) => (value: string) => {
  if (!value.startsWith(prefix)) {
    return false;
  }

  const splitted = value.split('.');
  const hasTwoDots = splitted.length === 3;
  if (
    !hasTwoDots ||
    splitted[0] === undefined ||
    splitted[1] === undefined ||
    splitted[2] === undefined
  ) {
    return false;
  }

  if (splitted[0].length < 15) {
    return false;
  }

  if (splitted[1].length < 30) {
    return false;
  }

  if (splitted[2].length < 30) {
    return false;
  }

  return true;
};

test('lizard should generate JWT 256', async () => {
  const actual = await lizard({id: 'lunar123'});
  assertSuccessfulResultFormat(
    actual,
    looksLikeJwt('test:'),
    'Should look like a JWT token'
  );
});

test('lizard should generate with good strength', async () => {
  const actual = await lizardGood({id: 'lunar123'});
  assertSuccessfulResultFormat(
    actual,
    looksLikeJwt('test:'),
    'Should look like a JWT token'
  );
});

test('lizard should generate with strong strength', async () => {
  const actual = await lizardStrong({id: 'lunar123'});
  assertSuccessfulResultFormat(
    actual,
    looksLikeJwt('test:'),
    'Should look like a JWT token'
  );
});
