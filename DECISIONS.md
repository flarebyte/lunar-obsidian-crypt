# Architecture decision records

An [architecture
decision](https://cloud.google.com/architecture/architecture-decision-records)
is a software design choice that evaluates:

- a functional requirement (features).
- a non-functional requirement (technologies, methodologies, libraries).

The purpose is to understand the reasons behind the current architecture, so
they can be carried-on or re-visited in the future.

## Hero prompt

> In a black and white comic style, draw a scene on the moon where a dark and mysterious crypt stands out among the craters. The crypt is made of shiny black obsidian stones that are engraved with strange symbols and patterns. A large metal door with a circular lock blocks the entrance to the crypt. A silver key with a matching symbol hangs from a chain around the neck of a skeleton astronaut who lies on the ground near the door.

## Encrypt locator id

### Context and Problem Statement

> An reference to an id representing a resource (ex: product:113) could be easily changed to a different one (ex: product:114). It is recommended to check that the user has really access to product:113 or product:114. This verification could be done through a database lookup but this is costly. Alternatively, we could proide an id that is difficult to tamper.

### Decision Drivers

* Foolproof

### Decision Outcome

We could use [PASETO](https://paragonie.com/blog/2017/03/jwt-json-web-tokens-is-bad-standard-that-everyone-should-avoid) as an alternative to [JSON Web Token](https://jwt.io/) as it seems to follow a similar goal.

What we want to be able to do:
* Adds a digital signature to an ID
* The payload should contain
- an ID
- user scope that should be verified
- an expiration time (seconds to months)

Possible scope, but not restricted:
- userId: The user ID that represents the current user.
- tenantId: the tenant ID that represents the current tenant.
- groupId: the group ID that represent the current group.
- roleId: the role ID that represent the current role.
- periodId: the period ID that represents the current period.
- tagId: the tag ID that represents the current tag.

In some cases, we may want to support array of string as value (ex: groupIds)

Some [keys](https://www.iana.org/assignments/jwt/jwt.xhtml) that could potentially be used for scope.

We should assume a minimum and maximum size for each key. 
This way the expected resulting string size can be anticipated.

Resulting string: prefix:code