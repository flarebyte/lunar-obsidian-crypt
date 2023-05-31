import {type CryptIdPayload} from '../src/crypt-model.js';
import {type Result} from '../src/railway.js';
import {
  assertSuccessfulResult,
  assertSuccessfulResultFormat,
} from './assert-utils.js';
import {looksLikeJwt} from './jwt-utils.js';
import {type FixtureCryptStoreKey, lunarCrypt} from './fixture-crypt-store.js';
import {assertOpts} from './lizard-sign.test.js';

export const assertSignAndVerify = async (
  name: FixtureCryptStoreKey,
  payload: CryptIdPayload
) => {
  const actual: Result<string, string> = await lunarCrypt.signId(name, payload);
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
};
