/* eslint-disable @typescript-eslint/no-floating-promises */
import {test} from 'node:test';
import {CryptModelBuilder} from '../src/crypt-builder.js';
import {LunarObsidianCrypt} from '../src/index.mjs';
import {assertSuccessfulResultFormat} from './assert-utils.js';
import {looksLikeJwt} from './jwt-utils.js';

const encodeSecret = (secret: string): Uint8Array =>
  new TextEncoder().encode(secret);

export const assertOpts = {
  stringify: true,
};

const cryptStore = new CryptModelBuilder()
  .setTitle('Test store')
  .addLizard('lizard-sufficient', {
    kind: 'lizard',
    title: 'lizard sufficient',
    secret: encodeSecret('terrible-password'),
    expiration: {
      value: 2,
      unit: 'seconds',
    },
    strength: 'sufficient',
  })
  .addLizard('lizard-good', {
    kind: 'lizard',
    title: 'lizard good',
    secret: encodeSecret('terrible-password'),
    expiration: {
      value: 2,
      unit: 'seconds',
    },
    strength: 'good',
  })
  .addLizard('lizard-strong', {
    kind: 'lizard',
    title: 'lizard strong',
    secret: encodeSecret('terrible-password'),
    expiration: {
      value: 2,
      unit: 'seconds',
    },
    strength: 'strong',
  });

const loCrypt = new LunarObsidianCrypt(cryptStore.build());

test('lizard should generate JWT 256', async () => {
  const actual = await loCrypt.signId('lizard-sufficient', {id: 'lunar123'});
  assertSuccessfulResultFormat(
    actual,
    looksLikeJwt('test:'),
    'Should look like a JWT token'
  );
});

test('lizard should generate JWT 256 with context', async () => {
  const actual = await loCrypt.signId({id: 'lunar123', scope: {team: 'red'}});
  assertSuccessfulResultFormat(
    actual,
    looksLikeJwt('test:'),
    'Should look like a JWT token'
  );
});

test('lizard should generate with good strength', async () => {
  const actual = await loCrypt.signId({id: 'lunar123'});
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
