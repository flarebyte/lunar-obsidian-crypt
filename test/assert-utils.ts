import assert from 'node:assert/strict';
import {boolean} from 'zod';
import {type Result} from '../src/railway.js';

type AssertOpts = {
  stringify: boolean;
};

export function assertSuccessfulResult<A, E>(
  actual: Result<A, E>,
  expected: A,
  opts?: AssertOpts
) {
  if (actual.status !== 'success') {
    assert.strictEqual(actual.status, 'success');
    return;
  }

  const shouldStringify = opts === undefined ? true : opts.stringify;
  if (shouldStringify) {
    const jsonActual = JSON.stringify(actual.value);
    const jsonExpected = JSON.stringify(expected);
    if (jsonExpected !== jsonActual) {
      assert.strictEqual(jsonActual, jsonExpected);
    }
  } else if (expected !== actual.value) {
    assert.strictEqual(actual.value, expected);
  }
}

export function assertSuccessfulResultFormat<A, E>(
  actual: Result<A, E>,
  expectedFunc: (value: A) => boolean,
  message: string
) {
  if (actual.status !== 'success') {
    assert.strictEqual(actual.status, 'success');
    return;
  }

  const jsonActual = JSON.stringify(actual.value);
  assert.ok(
    expectedFunc(actual.value),
    `${message}. Actual value is: ${jsonActual}`
  );
}

export function assertFailedResult<A, E>(
  actual: Result<A, E>,
  expected: E,
  opts?: AssertOpts
) {
  if (actual.status !== 'failure') {
    assert.strictEqual(actual.status, 'failure');
    return;
  }

  const shouldStringify = opts === undefined ? true : opts.stringify;

  if (shouldStringify) {
    const jsonActual = JSON.stringify(actual.error);
    const jsonExpected = JSON.stringify(expected);
    if (jsonExpected !== jsonActual) {
      assert.strictEqual(jsonActual, jsonExpected);
    }
  } else if (expected !== actual.error) {
    assert.strictEqual(actual.error, expected);
  }
}
