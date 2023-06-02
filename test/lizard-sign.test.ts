import {test} from 'node:test';
import {assertSignAndFailVerify, assertSignAndVerify} from './assert-crypt.js';

export const assertOpts = {
  stringify: true,
};

test('lizard should generate JWT 256', async () => {
  const payload = {id: 'lunar123'};
  const name = 'lizard-sufficient';
  await assertSignAndVerify(name, payload);
});

test('lizard should generate with context', async () => {
  const payload = {
    id: 'lunar123',
    scope: {team: 'red'},
  };
  const name = 'lizard-sufficient';
  await assertSignAndVerify(name, payload);
});

test('lizard should detect that the time has expired', async () => {
  const payload = {
    id: 'lunar123',
    scope: {team: 'red'},
  };
  const name = 'lizard-sufficient';
  await assertSignAndFailVerify({
    name,
    payload,
    failureTypes: ['delay'],
    expectedError: {
      step: 'verify-id/verify-token',
      message: 'The JWT token has expired',
    },
  });
});

test('lizard should detect that the secret is wrong', async () => {
  const payload = {
    id: 'lunar123',
    scope: {team: 'red'},
  };
  const name = 'lizard-sufficient';
  await assertSignAndFailVerify({
    name,
    payload,
    failureTypes: ['wrong-secret'],
    expectedError: {
      step: 'verify-id/verify-token',
      message:
        'The signature for the JWT token cannot be verified using current secret',
    },
  });
});

test('lizard should generate with good strength', async () => {
  const payload = {id: 'lunar123'};
  const name = 'lizard-good';
  await assertSignAndVerify(name, payload);
});

test('lizard should try previous secret if provided', async () => {
  const payload = {id: 'lunar123'};
  const name = 'lizard-good';
  await assertSignAndVerify(name, payload, 'previous-password');
});

test('lizard should generate with strong strength and check the scope', async () => {
  const payload = {
    id: 'lunar123',
    scope: {account: 'account890', year: '2022', willBeIgnored: 'should'},
  };
  const name = 'lizard-strong';
  await assertSignAndVerify(name, payload);
});

test('lizard should detect scope with mandatory missing field', async () => {
  const payload = {
    id: 'lunar123',
    scope: {noAccount: 'account890', year: '2022', willBeIgnored: 'should'},
  };
  const name = 'lizard-strong';
  await assertSignAndFailVerify({
    name,
    payload,
    failureTypes: [],
    expectedError: {
      step: 'verify-id/verify-scope',
      message:
        'The following fields [account] from the scope did not match the expectations',
    },
  });
});

test('lizard should detect scope with incorrect field', async () => {
  const payload = {
    id: 'lunar123',
    scope: {account: 'wrong-account', year: '2022', willBeIgnored: 'should'},
  };
  const name = 'lizard-strong';
  await assertSignAndFailVerify({
    name,
    payload,
    failureTypes: [],
    expectedError: {
      step: 'verify-id/verify-scope',
      message:
        'The following fields [account] from the scope did not match the expectations',
    },
  });
});

test('lizard should detect scope that fails the custom validator', async () => {
  const payload = {
    id: 'lunar123',
    scope: {account: 'account890', year: '1990', willBeIgnored: 'should'},
  };
  const name = 'lizard-strong';
  await assertSignAndFailVerify({
    name,
    payload,
    failureTypes: [],
    expectedError: {
      step: 'verify-id/verify-scope',
      message: 'The custom validator failed with document is too ancient',
    },
  });
});
