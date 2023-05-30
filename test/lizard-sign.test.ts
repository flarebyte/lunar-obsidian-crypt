/* eslint-disable @typescript-eslint/no-floating-promises */
import {test} from 'node:test';
import {
  assertSuccessfulResult,
  assertSuccessfulResultFormat,
} from './assert-utils.js';
import {looksLikeJwt} from './jwt-utils.js';
import {lunarCrypt} from './fixture-crypt-store.js';

const assertOpts = {
  stringify: true,
};

test('lizard should generate JWT 256', async () => {
  const payload = {id: 'lunar123'};
  const name = 'lizard-sufficient';
  const actual = await lunarCrypt.signId(name, payload);
  assertSuccessfulResultFormat(
    actual,
    looksLikeJwt(`${name}:`),
    'Should look like a JWT token'
  );
  if (actual.status === 'failure') {
    return;
  }

  const verifyActual = await lunarCrypt.verifyIdSignature(name, actual.value);
  assertSuccessfulResult(verifyActual, payload, assertOpts);
});

test('lizard should generate JWT 256 with context', async () => {
  const actual = await lunarCrypt.signId('lizard-sufficient', {
    id: 'lunar123',
    scope: {team: 'red'},
  });
  assertSuccessfulResultFormat(
    actual,
    looksLikeJwt('lizard-sufficient:'),
    'Should look like a JWT token'
  );
});

test('lizard should generate with good strength', async () => {
  const actual = await lunarCrypt.signId('lizard-good', {id: 'lunar123'});
  assertSuccessfulResultFormat(
    actual,
    looksLikeJwt('lizard-good:'),
    'Should look like a JWT token'
  );
});

test('lizard should generate with strong strength', async () => {
  const actual = await lunarCrypt.signId('lizard-strong', {id: 'lunar123'});
  assertSuccessfulResultFormat(
    actual,
    looksLikeJwt('lizard-strong:'),
    'Should look like a JWT token'
  );
});
