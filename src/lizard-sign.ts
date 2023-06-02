import {SignJWT, decodeJwt, jwtVerify} from 'jose';
import {safeParse} from 'faora-kai';
import {
  type LunarObsidianCryptIdPayload,
  type LunarObsidianCryptEncryptionStrength,
  type CrypLizardCypher,
  type CryptIdPayloadWithExp,
  idPayloadWithExpSchema,
  type LunarObsidianCryptError,
} from './crypt-model.js';
import {type Result, succeed, willFail} from './railway.js';

const strenghtToAlgorithm = (
  strength: LunarObsidianCryptEncryptionStrength
) => {
  switch (strength) {
    case 'sufficient': {
      return 'HS256';
    }

    case 'good': {
      return 'HS384';
    }

    case 'strong': {
      return 'HS512';
    }

    default: {
      return 'HS256';
    }
  }
};

export const lizardSign = async (
  name: string,
  cryptSignCypher: CrypLizardCypher & {kind: 'lizard'},
  value: LunarObsidianCryptIdPayload
): Promise<Result<string, LunarObsidianCryptError>> => {
  const {secret, expiration, strength} = cryptSignCypher;
  const realValue = {...value};
  const jwt = await new SignJWT(realValue)
    .setProtectedHeader({alg: strenghtToAlgorithm(strength)})
    .setExpirationTime(`${expiration.value}s`)
    .sign(secret);
  return succeed(`${name}:${jwt}`);
};

const extractToken = (
  prefix: string,
  fullToken: string
): Result<string, LunarObsidianCryptError> => {
  const [token, ...prefixParts] = fullToken.split(':').reverse();
  const actualPrefix = prefixParts.reverse().join(':');
  if (actualPrefix !== prefix) {
    return willFail({
      step: 'verify-id/extract-token',
      message: `Prefix should be ${prefix} not ${actualPrefix}`,
    });
  }

  if (token === undefined) {
    return willFail({
      step: 'verify-id/extract-token',
      message: 'There is no token',
    });
  }

  return succeed(token);
};

const safeJwtVerify = async (
  token: string,
  secret: Uint8Array,
  payloadWithExp: CryptIdPayloadWithExp
): Promise<Result<CryptIdPayloadWithExp, LunarObsidianCryptError>> => {
  try {
    await jwtVerify(token, secret);
    return succeed(payloadWithExp);
  } catch (error) {
    if (error instanceof Error) {
      switch (error.name) {
        case 'JWTExpired': {
          return willFail({
            step: 'verify-id/verify-token',
            message: 'The JWT token has expired',
          });
        }

        case 'JWSSignatureVerificationFailed': {
          return willFail({
            step: 'verify-id/verify-token',
            message:
              'The signature for the JWT token cannot be verified using current secret',
          });
        }

        default: {
          return willFail({
            step: 'verify-id/verify-token',
            message: `The JWT token could not be verified (${error.name})`,
          });
        }
      }
    }

    return willFail({
      step: 'verify-id/verify-token',
      message: 'An unexpected error occured during JWT token verification',
    });
  }
};

/** Lizard verify */
export const lizardVerify = async (
  name: string,
  cryptSignCypher: CrypLizardCypher & {kind: 'lizard'},
  fullToken: string
): Promise<Result<LunarObsidianCryptIdPayload, LunarObsidianCryptError>> => {
  const {secret, altSecret} = cryptSignCypher;
  const tokenResult = extractToken(name, fullToken);
  if (tokenResult.status === 'failure') {
    return willFail(tokenResult.error);
  }

  const token = tokenResult.value;
  const protectedPayload = decodeJwt(token);
  const parsedResult = safeParse<CryptIdPayloadWithExp>(protectedPayload, {
    schema: idPayloadWithExpSchema,
    formatting: 'privacy-first',
  });
  if (parsedResult.status === 'failure') {
    return willFail({
      step: 'verify-id/validate-payload',
      errors: parsedResult.error,
    });
  }

  const verifyResult = await safeJwtVerify(token, secret, parsedResult.value);
  if (verifyResult.status === 'failure') {
    if (altSecret !== undefined) {
      const altVerifyResult = await safeJwtVerify(
        token,
        altSecret,
        parsedResult.value
      );
      if (altVerifyResult.status === 'success') {
        return succeed({...altVerifyResult.value, exp: undefined});
      }

      return willFail({
        ...altVerifyResult.error,
        finalMessage: 'Verification with previous secret failed as well',
      });
    }

    return willFail(verifyResult.error);
  }

  return succeed({...verifyResult.value, exp: undefined});
};
