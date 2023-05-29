import {CryptModelBuilder} from '../src/crypt-builder.js';
import {LunarObsidianCrypt} from '../src/index.mjs';

const encodeSecret = (secret: string): Uint8Array =>
  new TextEncoder().encode(secret);
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
export const lunarCrypt = new LunarObsidianCrypt(cryptStore.build());
