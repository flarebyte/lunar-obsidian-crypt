# lunar-obsidian-crypt

![npm](https://img.shields.io/npm/v/lunar-obsidian-crypt) ![Build
status](https://github.com/flarebyte/lunar-obsidian-crypt/actions/workflows/main.yml/badge.svg)
![npm bundle
size](https://img.shields.io/bundlephobia/min/lunar-obsidian-crypt)

![npm type
definitions](https://img.shields.io/npm/types/lunar-obsidian-crypt)
![node-current](https://img.shields.io/node/v/lunar-obsidian-crypt)
![NPM](https://img.shields.io/npm/l/lunar-obsidian-crypt)

![Experimental](https://img.shields.io/badge/status-experimental-blue)

> The easiest way to encrypt your data with TypeScript on the server side

Foolproof encryption functions curated for business cases

![Hero image for lunar-obsidian-crypt](lunar-obsidian-crypt-hero-512.jpeg)

Highlights:

-   Simplify your encryption needs with a user-friendly library
-   Choose the best encryption method for your scenario, such as signing
    ID, verifying data, or securing messages
-   Avoid common encryption pitfalls with sensible defaults and best
    practices
-   Leverage the power and security of JOSE JWT standards

A few examples of commands:

Sign a payload with just an identifier and get back a full token:

```bash
const signResult = await signLunarCrypt.signId('product', { id:
'product123'});

```

Verify a full token and get back a payload:

```bash
const verifyResult = await lunarCrypt.verifyId(fullToken);

```

## Documentation and links

-   [Code Maintenance :wrench:](MAINTENANCE.md)
-   [Code Of Conduct](CODE_OF_CONDUCT.md)
-   [Api for lunar-obsidian-crypt](API.md)
-   [Contributing :busts\_in\_silhouette: :construction:](CONTRIBUTING.md)
-   [Diagram for the code base :triangular\_ruler:](INTERNAL.md)
-   [Vocabulary used in the code base :book:](CODE_VOCABULARY.md)
-   [Architectural Decision Records :memo:](DECISIONS.md)
-   [Contributors
    :busts\_in\_silhouette:](https://github.com/flarebyte/lunar-obsidian-crypt/graphs/contributors)
-   [Dependencies](https://github.com/flarebyte/lunar-obsidian-crypt/network/dependencies)
-   [Glossary
    :book:](https://github.com/flarebyte/overview/blob/main/GLOSSARY.md)
-   [Software engineering principles
    :gem:](https://github.com/flarebyte/overview/blob/main/PRINCIPLES.md)
-   [Overview of Flarebyte.com ecosystem
    :factory:](https://github.com/flarebyte/overview)
-   [Npm dependencies](DEPENDENCIES.md)
-   [Usage](USAGE.md)

## Related

## Installation

This package is [ESM
only](https://blog.sindresorhus.com/get-ready-for-esm-aa53530b3f77).

```bash
yarn add lunar-obsidian-crypt
```
