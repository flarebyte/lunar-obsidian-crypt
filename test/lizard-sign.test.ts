import {test} from 'node:test';
import {assertSignAndVerify} from './assert-crypt.js';

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
