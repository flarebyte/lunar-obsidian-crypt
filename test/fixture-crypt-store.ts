import {LunarObsidianStoreBuilder} from '../src/crypt-builder.js';
import {LunarObsidianCrypt} from '../src/index.mjs';

export type FixtureCryptStoreKey =
  | 'lizard-sufficient'
  | 'lizard-good'
  | 'lizard-strong';

const encodeSecret = (secret: string): Uint8Array =>
  new TextEncoder().encode(secret);
const cryptStoreBuilder = new LunarObsidianStoreBuilder<FixtureCryptStoreKey>()
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
    secret: encodeSecret('another-terrible-password'),
    expiration: {
      value: 2,
      unit: 'seconds',
    },
    strength: 'good',
  })
  .addLizard('lizard-strong', {
    kind: 'lizard',
    title: 'lizard strong',
    secret: encodeSecret('very-terrible-password'),
    expiration: {
      value: 2,
      unit: 'seconds',
    },
    strength: 'strong',
  });

const otherCryptStoreBuilder =
  new LunarObsidianStoreBuilder<FixtureCryptStoreKey>()
    .setTitle('Test store')
    .addLizard('lizard-sufficient', {
      kind: 'lizard',
      title: 'lizard sufficient',
      secret: encodeSecret('terrible-password-other'),
      expiration: {
        value: 2,
        unit: 'seconds',
      },
      strength: 'sufficient',
    })
    .addLizard('lizard-good', {
      kind: 'lizard',
      title: 'lizard good',
      secret: encodeSecret('another-terrible-password-other'),
      expiration: {
        value: 2,
        unit: 'seconds',
      },
      strength: 'good',
    })
    .addLizard('lizard-strong', {
      kind: 'lizard',
      title: 'lizard strong',
      secret: encodeSecret('very-terrible-password-other'),
      expiration: {
        value: 2,
        unit: 'seconds',
      },
      strength: 'strong',
    });
export const lunarCrypt = new LunarObsidianCrypt<FixtureCryptStoreKey>(
  cryptStoreBuilder
);

export const otherLunarCrypt = new LunarObsidianCrypt<FixtureCryptStoreKey>(
  otherCryptStoreBuilder
);
