import {
  type LunarObsidianCryptError,
  type LunarObsidianCryptIdPayload,
} from '../src/index.mjs';
import {
  assertFailedResult,
  assertSuccessfulResult,
  assertSuccessfulResultFormat,
} from './assert-utils.js';
import {looksLikeJwt} from './jwt-utils.js';
import {
  type FixtureCryptStoreKey,
  lunarCrypt,
  otherLunarCrypt,
} from './fixture-crypt-store.js';
import {assertOpts} from './lizard-sign.test.js';

export const assertSignAndVerify = async (
  name: FixtureCryptStoreKey,
  payload: LunarObsidianCryptIdPayload,
  flag?: 'previous-password'
) => {
  const signLunarCrypt =
    flag === 'previous-password' ? otherLunarCrypt : lunarCrypt;
  const actual = await signLunarCrypt.signId(name, payload);
  assertSuccessfulResultFormat(
    actual,
    looksLikeJwt(`${name}:`),
    'Should look like a JWT token'
  );
  if (actual.status === 'failure') {
    return;
  }

  const verifyActual = await lunarCrypt.verifyId(actual.value);

  assertSuccessfulResult(verifyActual, payload, assertOpts);
};

async function delayMs(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const assertFailSign = async ({
  name,
  payload,
  expectedError,
}: {
  name: FixtureCryptStoreKey;
  payload: Record<string, unknown>;
  expectedError: LunarObsidianCryptError;
}) => {
  const actual = await lunarCrypt.signId(
    name,
    payload as LunarObsidianCryptIdPayload
  );
  assertFailedResult(actual, expectedError, assertOpts);
};

export const assertSignAndFailVerify = async ({
  name,
  payload,
  failureTypes,
  expectedError,
}: {
  name: FixtureCryptStoreKey;
  payload: LunarObsidianCryptIdPayload;
  failureTypes: Array<'delay' | 'wrong-secret'>;
  expectedError: LunarObsidianCryptError;
}) => {
  const actual = await lunarCrypt.signId(name, payload);
  assertSuccessfulResultFormat(
    actual,
    looksLikeJwt(`${name}:`),
    'Should look like a JWT token'
  );
  if (actual.status === 'failure') {
    return;
  }

  if (failureTypes.includes('delay')) {
    await delayMs(3000);
  }

  const verificationLunarCrypt = failureTypes.includes('wrong-secret')
    ? otherLunarCrypt
    : lunarCrypt;

  const verifyActual = await verificationLunarCrypt.verifyId(actual.value);

  assertFailedResult(verifyActual, expectedError, assertOpts);
};
