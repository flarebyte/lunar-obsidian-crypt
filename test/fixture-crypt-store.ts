import {LunarObsidianCrypt, LunarObsidianStoreBuilder} from '../src/index.mjs';

const fixtureCryptStoreKeys = [
  'lizard-sufficient',
  'lizard-good',
  'lizard-strong',
] as const;

export type FixtureCryptStoreKey = (typeof fixtureCryptStoreKeys)[number];

const encodeSecret = (secret: string): Uint8Array =>
  new TextEncoder().encode(secret);
const cryptStoreBuilder = new LunarObsidianStoreBuilder<FixtureCryptStoreKey>()
  .setTitle('Test store')
  .addTranslucentLizard('lizard-sufficient', {
    kind: 'translucent-lizard',
    title: 'lizard sufficient',
    secret: encodeSecret('terrible-password'),
    expiration: {
      value: 2,
      unit: 'seconds',
    },
    strength: 'sufficient',
  })
  .addTranslucentLizard('lizard-good', {
    kind: 'translucent-lizard',
    title: 'lizard good',
    secret: encodeSecret('another-terrible-password'),
    altSecret: encodeSecret('another-terrible-password-other'),
    expiration: {
      value: 2,
      unit: 'days',
    },
    strength: 'good',
  })
  .addTranslucentLizard('lizard-strong', {
    kind: 'translucent-lizard',
    title: 'lizard strong',
    secret: encodeSecret('very-terrible-password'),
    expiration: {
      value: 2,
      unit: 'weeks',
    },
    strength: 'strong',
    expectedScope: {
      account: 'account890',
    },
    scopeValidator(scope: Record<string, string | string[]>) {
      const {year} = scope;
      if (typeof year !== 'string') {
        return 'incorrect format';
      }

      if (Number.parseInt(year, 10) < 2000) {
        return 'document is too ancient';
      }

      return true;
    },
  });

const otherCryptStoreBuilder =
  new LunarObsidianStoreBuilder<FixtureCryptStoreKey>()
    .setTitle('Test store')
    .addTranslucentLizard('lizard-sufficient', {
      kind: 'translucent-lizard',
      title: 'lizard sufficient',
      secret: encodeSecret('terrible-password-other'),
      expiration: {
        value: 2,
        unit: 'seconds',
      },
      strength: 'sufficient',
    })
    .addTranslucentLizard('lizard-good', {
      kind: 'translucent-lizard',
      title: 'lizard good',
      secret: encodeSecret('another-terrible-password-other'),
      expiration: {
        value: 2,
        unit: 'days',
      },
      strength: 'good',
    })
    .addTranslucentLizard('lizard-strong', {
      kind: 'translucent-lizard',
      title: 'lizard strong',
      secret: encodeSecret('very-terrible-password-other'),
      expiration: {
        value: 2,
        unit: 'weeks',
      },
      strength: 'strong',
    });
export const lunarCrypt = new LunarObsidianCrypt<FixtureCryptStoreKey>({
  builder: cryptStoreBuilder,
  prefixes: fixtureCryptStoreKeys,
});

export const otherLunarCrypt = new LunarObsidianCrypt<FixtureCryptStoreKey>({
  builder: otherCryptStoreBuilder,
  prefixes: fixtureCryptStoreKeys,
});
