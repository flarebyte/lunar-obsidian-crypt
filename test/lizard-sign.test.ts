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

test('lizard should generate JWT 256 with context', async () => {
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

test('lizard should generate with strong strength', async () => {
  const payload = {id: 'lunar123'};
  const name = 'lizard-strong';
  await assertSignAndVerify(name, payload);
});
