# Usage

## Create an encryption key store

Create a secure store for encryption keys that can be used to sign product
and company IDs. The store has a title and two prefixes (product and
company), each with its own settings and attributes. The configuration for
each prefix specifies a method that uses the `translucent lizard` algorithm
(made up algorithm), which is a type of symmetric encryption (HMAC) Json Web
Token signing algorithm. The configuration includes an expiration time and a
strength level, and the company key also has an expected scope that specifies
the account it can be used with.

```typescript
const myCryptStorePrefixes = ["product", "company"] as const;

export type MyCryptStorePrefix = typeof myCryptStorePrefixes[number];

const cryptStoreBuilder = new LunarObsidianStoreBuilder<MyCryptStorePrefix>()
  .setTitle("My encryption key store")
  .addTranslucentLizard("product", {
    title: "Sign a product ID",
    secret: encodeSecret("very-long-password"),
    expiration: {
      value: 2,
      unit: "hours",
    },
    strength: "sufficient",
  })
  .addTranslucentLizard("company", {
    title: "Sign a company ID",
    secret: encodeSecret("very-long-password"),
    expiration: {
      value: 2,
      unit: "weeks",
    },
    strength: "sufficient",
    expectedScope: {
      account: "account890",
    },
  });

const lunarCrypt = new LunarObsidianCrypt<MyCryptStorePrefix>({
  builder: cryptStoreBuilder,
  prefixes: myCryptStorePrefixes,
});
```

## Sign

The code creates a payload object that contains a product ID and an account.
It then uses a signLunarCrypt object to sign the product ID with a token. If
the signing is successful, it stores the full token in a variable.

```typescript
const payload = {
  id: "product123",
  scope: {
    account: "account890",
  },
};

const signResult = await signLunarCrypt.signId("product", payload);
if (signResult.status === "success") {
  const fullToken = signResult.value; // product:...token ...
}
```

## Verify

The code uses a lunarCrypt object to verify the full token. It waits for the
verification result, which is an object that has a status and a value
property. If the status is ‘success’, it extracts the value property, which
is the payload object that contains the product ID and the account.

```typescript
const verifyResult = await lunarCrypt.verifyId(fullToken);
if (verifyResult.status === "success") {
  const payload = verifyResult.value;
}
```
