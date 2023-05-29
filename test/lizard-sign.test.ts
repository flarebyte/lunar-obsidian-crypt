/* eslint-disable @typescript-eslint/no-floating-promises */
import {test} from 'node:test';
import {assertSuccessfulResultFormat} from './assert-utils.js';
import {looksLikeJwt} from './jwt-utils.js';
import {lunarCrypt} from './fixture-crypt-store.js';

test('lizard should generate JWT 256', async () => {
  const actual = await lunarCrypt.signId('lizard-sufficient', {id: 'lunar123'});
  assertSuccessfulResultFormat(
    actual,
    looksLikeJwt('lizard-sufficient:'),
    'Should look like a JWT token'
  );
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
