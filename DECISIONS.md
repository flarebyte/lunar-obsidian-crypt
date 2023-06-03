# Architecture decision records

An [architecture
decision](https://cloud.google.com/architecture/architecture-decision-records)
is a software design choice that evaluates:

-   a functional requirement (features).
-   a non-functional requirement (technologies, methodologies, libraries).

The purpose is to understand the reasons behind the current architecture, so
they can be carried-on or re-visited in the future.

## Hero prompt

> In a black and white comic style, draw a scene on the moon where a dark
> and mysterious crypt stands out among the craters. The crypt is made of
> shiny black obsidian stones that are engraved with strange symbols and
> patterns. A large metal door with a circular lock blocks the entrance
> to the crypt. A silver key with a matching symbol hangs from a chain
> around the neck of a skeleton astronaut who lies on the ground near the
> door.

## Glossary

-   **Encryption**: The process of changing data or a message into a secret
    code that only the intended receiver can understand. The data or
    message is changed using a special method and a secret word or number.
-   **Decryption**: The process of changing the secret code back into the
    original data or message using the same or a different secret word or
    number.
-   **Key**: A secret word or number that is used by the special method to
    change the data or message. The key should be kept hidden from anyone
    who is not supposed to read the data or message and should be changed
    often to prevent hacking.
-   **Plaintext**: A normal, readable, plain message that anyone can read.
-   **Ciphertext**: The result of the encryption process. A ciphertext is
    an unreadable, scrambled form of the original message.
-   **Hash**: A short value that is made from a longer input using a math
    function. A hash is used to check if the data or a message has been
    changed or tampered with, as any change in the input will result in a
    different hash.
-   **Salt**: A random value that is added to a password or a message
    before making a hash of it. A salt is used to prevent hacking that uses
    pre-made hashes of common passwords or messages.
-   **Symmetric encryption**: A type of encryption that uses the same
    secret word or number for both changing and unchanging the data or
    message. Symmetric encryption is fast and easy, but requires a safe way
    to share and manage the secret word or number.
-   **Asymmetric encryption**: A type of encryption that uses two different
    keys: a public key and a private key. The public key can be used by
    anyone to change data or a message for a specific receiver, but only
    the matching private key can unchange it. The private key can also be
    used to sign data or a message with their identity, which can be
    checked by anyone using the public key. Asymmetric encryption is more
    secure and flexible than symmetric encryption, but also more complex
    and slow.
-   **Public key**: A key that is publicly available and can be used by
    anyone to change data or a message for a specific receiver or to check
    the signature of a sender.
-   **Private key**: A key that is kept hidden by its owner and can be used
    to unchange data or a message that was changed with the matching public
    key or to sign data or a message with their identity.
-   **VPN**: A virtual private network. A VPN is a service that creates a
    safe and secret connection between a user's device and a server over
    the internet. A VPN can be used to protect the user's privacy, avoid
    censorship, access content that is blocked in their country, and hide
    their online activity from their internet provider (ISP) or other
    people who might spy on them.

## Available libraries

### Encryption libraries

| Name                                                         | Description                                                                             | Advantages                                                                                                                                                                                                                         | Drawbacks                                                                                                                                                            | Popularity                                 | TypeScript |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---------- |
| [crypto](https://nodejs.org/api/crypto.html)                 | A built-in module that provides cryptographic functionality based on OpenSSL.           | Supports various algorithms for hashing, encryption, decryption, signing, and verifying. Has a stream interface for working with large data.                                                                                       | Does not support modern algorithms such as AES-GCM or ChaCha20-Poly1305. May have compatibility issues with different Node.js versions.                              | Very high (built-in)                       | No         |
| [bcrypt](https://www.npmjs.com/package/bcrypt)               | A library to help you hash passwords.                                                   | Uses the Blowfish cipher to generate secure hashes. Prevents rainbow table and brute force attacks. Supports async and sync methods.                                                                                               | Only suitable for hashing passwords, not for general encryption or decryption. May have installation issues on some platforms.                                       | High (over 18 million weekly downloads)    | Yes        |
| [crypto-js](https://www.npmjs.com/package/crypto-js)         | A collection of standard and secure cryptographic algorithms implemented in JavaScript. | Supports various algorithms for hashing, encryption, decryption, encoding, and decoding. Has a simple and consistent API. Works in both browser and node environments.                                                             | Does not support stream processing or async methods. May have performance issues with large data.                                                                    | High (over 13 million weekly downloads)    | No         |
| [node-forge](https://www.npmjs.com/package/node-forge)       | A native implementation of TLS and other cryptographic tools in JavaScript.             | Supports various algorithms for hashing, encryption, decryption, signing, verifying, encoding, and decoding. Has a stream interface for working with large data. Supports TLS 1.2 and 1.3 protocols.                               | Does not use native code or OpenSSL, which may affect performance and security. May have compatibility issues with some browsers or Node.js versions.                | Moderate (over 2 million weekly downloads) | No         |
| [sodium-native](https://www.npmjs.com/package/sodium-native) | A low-level binding for libsodium, a modern and easy-to-use crypto library.             | Supports various algorithms for hashing, encryption, decryption, signing, verifying, key generation, and random number generation. Has a fast and secure implementation based on native code. Supports async methods and promises. | Requires libsodium to be installed on the system. Has a low-level and complex API that may be hard to use correctly. May have installation issues on some platforms. | Low (over 200 thousand weekly downloads)   | No         |

### Json Web Token libraries

| Name                                                       | Description                                                                                                   | Advantages                                                                                                                                                                                                                                 | Drawbacks                                                                                                                                                                                               | Popularity                                    | TypeScript |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ---------- |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | A module that provides JSON Web Token functionality based on node-jws and RFC 7519.                           | Supports various algorithms for signing and verifying tokens, as well as JWT claims validation. Has a simple and consistent API. Supports async and sync methods.                                                                          | Does not support modern algorithms such as EdDSA or ES256K. May have compatibility issues with different Node.js versions.                                                                              | High (over 12 million weekly downloads)       | No         |
| [express-jwt](https://www.npmjs.com/package/express-jwt)   | A middleware that validates JSON Web Tokens and sets req.user.                                                | Integrates easily with express applications. Allows customizing the token validation logic and error handling. Supports tokens from HTTP headers, query parameters, or cookies.                                                            | Only suitable for validating tokens, not for signing or generating them. Depends on jsonwebtoken module for the actual verification logic. May have security issues if not configured properly.         | Moderate (over 500 thousand weekly downloads) | No         |
| [jose](https://www.npmjs.com/package/jose)                 | A comprehensive set of libraries for various cryptographic operations, including JWT, JWS, JWE, JWK, and JWA. | Supports various algorithms for signing, verifying, encrypting, decrypting, and validating tokens, as well as JWK generation and management. Has a fast and secure implementation based on native code. Supports promises and async/await. | Requires Node.js version 12 or higher. Has a low-level and complex API that may be hard to use correctly. May have installation issues on some platforms.                                               | Moderate (over 1 million weekly downloads)    | Yes        |
| [pareto](https://www.npmjs.com/package/pareto)             | A lightweight library for creating and verifying JWTs with minimal dependencies.                              | Supports various algorithms for signing and verifying tokens, as well as JWT claims validation. Has a small footprint and no external dependencies. Supports async methods and promises.                                                   | Does not support encrypting or decrypting tokens, only signing and verifying them. Does not support JWK generation or management. May have compatibility issues with some Node.js versions or browsers. | Low (over 10 thousand weekly downloads)       | Yes        |

## Available web services

### AWS Security web services that deal with security

| Name                                                                    | Description                                                                                                                                                                       | Usage                                                                                                                                                                                                                                                                                                                                                         | Pricing                                                                                                                                                                 |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AWS Identity and Access Management (IAM)](https://aws.amazon.com/iam/) | A service that enables you to manage access to AWS resources and services for your users and groups.                                                                              | You can use IAM to create and manage AWS users and groups, assign permissions to allow or deny access to AWS resources, and enable multi-factor authentication for enhanced security.                                                                                                                                                                         | Free of charge                                                                                                                                                          |
| [AWS Key Management Service (KMS)](https://aws.amazon.com/kms/)         | A service that allows you to create and manage encryption keys to protect your data in AWS.                                                                                       | You can use KMS to encrypt and decrypt data using keys that you control, or use AWS managed keys on your behalf. You can also use KMS to integrate with other AWS services that support encryption, such as Amazon S3, Amazon EBS, and Amazon RDS.                                                                                                            | $1.00 per month for each customer master key (CMK) that you create and store in KMS, plus $0.03 per 10,000 requests                                                     |
| [AWS Shield](https://aws.amazon.com/shield/)                            | A service that provides protection against distributed denial of service (DDoS) attacks for your web applications running on AWS.                                                 | You can use AWS Shield to automatically detect and mitigate common network and transport layer DDoS attacks that target your web applications or other internet-facing resources. You can also use AWS Shield Advanced for additional protection against larger and more sophisticated attacks, as well as access to 24/7 support and cost protection.        | AWS Shield Standard is included with your AWS services at no additional charge. AWS Shield Advanced costs $3,000 per month per organization, plus data transfer charges |
| [AWS WAF](https://aws.amazon.com/waf/)                                  | A web application firewall that helps protect your web applications from common web exploits that could affect availability, compromise security, or consume excessive resources. | You can use AWS WAF to define customizable web security rules that control which traffic to allow or block to your web applications. You can also use AWS WAF to monitor web requests and get real-time visibility into the traffic patterns and threats. You can integrate AWS WAF with Amazon CloudFront, Application Load Balancer, or Amazon API Gateway. | $5.00 per web access control list (web ACL) per month, plus $1.00 per rule per web ACL per month, plus $0.60 per million requests                                       |

## Encrypt locator id

### Context and Problem Statement

> An reference to an id representing a resource (ex: product:113) could
> be easily changed to a different one (ex: product:114). It is
> recommended to check that the user has really access to product:113 or
> product:114. This verification could be done through a database lookup
> but this is costly. Alternatively, we could proide an id that is
> difficult to tamper.

### Decision Drivers

-   Foolproof

### Decision Outcome

What we want to be able to do:

-   Adds a digital signature to an ID
-   The payload should contain:
    -   an ID
    -   user scope that should be verified
    -   an expiration time (seconds to months)

Possible scope, but not restricted:

-   userId: The user ID that represents the current user.
-   tenantId: the tenant ID that represents the current tenant.
-   groupId: the group ID that represent the current group.
-   roleId: the role ID that represent the current role.
-   periodId: the period ID that represents the current period.
-   tagId: the tag ID that represents the current tag.

In some cases, we may want to support array of string as value (ex: groupIds)

Some [keys](https://www.iana.org/assignments/jwt/jwt.xhtml) that could
potentially be used for scope.

We should assume a minimum and maximum size for each key.
This way the expected resulting string size can be anticipated.

Resulting string: `prefix:code`

One advantage of signing a payload instead of encrypting it is that it allows anyone to verify the source and content of the payload without needing to know the secret. This means the payload could be inspected for tracing errors for example. Another advantage of signing a payload instead of encrypting it is that it reduces the size and complexity of the payload.
Signing only requires hashing and encrypting a small portion of the payload (the signature), while encrypting requires transforming the entire payload into a ciphertext.

However, signing a payload instead of encrypting it also has some disadvantages. One disadvantage is that it does not protect the payload from being read or copied by unauthorized parties. This can be problematic for sensitive or confidential messages that need to be kept secret from eavesdroppers. But one could argue that the sensitive payload should not be passed to a possibly unauthorized party in the first place. 