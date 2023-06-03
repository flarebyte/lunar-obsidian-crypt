# Internal

> Overview of the code base of lunar-obsidian-crypt

This document has been generated automatically by
[baldrick-doc-ts](https://github.com/flarebyte/baldrick-doc-ts)

## Diagram of the dependencies

```mermaid
classDiagram
class `crypt-builder.ts`
class `crypt-model.ts`
class `lunar-obsidian-crypt.ts`
class `railway.ts`{
  +succeed()
  +willFail()
}
class `token-utils.ts`{
  +extractToken()
  +extractTokenPrefix()
}
class `translucent-lizard.ts`{
  - checkScope()
  - strenghtToAlgorithm()
  +translucentLizardSignId()
  - safeJwtVerify()
  +translucentLizardVerifyId()
}
class `./crypt-model.js`{
  +idPayloadSchema()
  +type LunarObsidianCryptError()
  +idPayloadWithExpSchema()
  +type CryptIdPayloadWithExp()
  +type LunarObsidianCrypTranslucentLizard()
  +type LunarObsidianCryptEncryptionStrength()
  +type LunarObsidianCryptIdPayload()
  +type LunarObsidianStoreModel()
}
class `faora-kai`{
  +safeParse()
  +stringFields()
  +stringEffectFields()
  +describeEnum()
}
class `zod`{
  +z()
}
class `./crypt-builder.js`{
  +type LunarObsidianStoreBuilder()
}
class `./translucent-lizard.js`{
  +translucentLizardVerifyId()
  +translucentLizardSignId()
}
class `./railway.js`{
  +willFail()
  +succeed()
  +type Result()
}
class `./token-utils.js`{
  +extractToken()
  +extractTokenPrefix()
}
class `jose`{
  +jwtVerify()
  +decodeJwt()
  +SignJWT()
}
`crypt-builder.ts`-->`./crypt-model.js`
`crypt-model.ts`-->`faora-kai`
`crypt-model.ts`-->`zod`
`lunar-obsidian-crypt.ts`-->`./crypt-builder.js`
`lunar-obsidian-crypt.ts`-->`./crypt-model.js`
`lunar-obsidian-crypt.ts`-->`./translucent-lizard.js`
`lunar-obsidian-crypt.ts`-->`./railway.js`
`lunar-obsidian-crypt.ts`-->`./token-utils.js`
`token-utils.ts`-->`./crypt-model.js`
`token-utils.ts`-->`./railway.js`
`translucent-lizard.ts`-->`jose`
`translucent-lizard.ts`-->`faora-kai`
`translucent-lizard.ts`-->`./crypt-model.js`
`translucent-lizard.ts`-->`./railway.js`
`translucent-lizard.ts`-->`./token-utils.js`
```
