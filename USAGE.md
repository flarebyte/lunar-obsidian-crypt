# Usage

## Create an encryption key store

```typescript
const myCryptStoreKeys = [
    'product',
    'company'
  ] as const;
  
  export type MyCryptStoreKey = (typeof myCryptStoreKeys)[number];
  
  const cryptStoreBuilder = new LunarObsidianStoreBuilder<MyCryptStoreKey>()
  .setTitle('My encryption key store')
  .addTranslucentLizard('product', {
    kind: 'translucent-lizard',
    title: 'Sign a product ID',
    secret: encodeSecret('very-long-password'),
    expiration: {
      value: 2,
      unit: 'hours',
    },
    strength: 'sufficient',
  })
   .addTranslucentLizard('company', {
    kind: 'translucent-lizard',
    title: 'Sign a company ID',
    secret: encodeSecret('very-long-password'),
    expiration: {
      value: 2,
      unit: 'weeks',
    },
    strength: 'sufficient',
    expectedScope: {
      account: 'account890',
    },
  })
  ```
