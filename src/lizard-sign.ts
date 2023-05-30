import {SignJWT, decodeJwt} from 'jose';
import {safeParse} from 'faora-kai';
import {
  type CryptIdPayload,
  type CryptEncryptionStrength,
  type CrypLizardCypher,
  type CryptSignResult,
  type CryptVerifyResult,
  idPayloadSchema,
} from './crypt-model.js';
import {type Result, succeed, willFail} from './railway.js';

const strenghtToAlgorithm = (strength: CryptEncryptionStrength) => {
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
  value: CryptIdPayload
): Promise<CryptSignResult> => {
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
): Result<string, string> => {
  const [token, ...prefixParts] = fullToken.split(':').reverse();
  const actualPrefix = prefixParts.reverse().join(':');
  if (actualPrefix !== prefix) {
    return willFail(`Prefix should be ${prefix} not ${actualPrefix}`);
  }

  if (token === undefined) {
    return willFail('There is no token');
  }

  return succeed(token);
};

export const lizardVerify = async (
  name: string,
  _cryptSignCypher: CrypLizardCypher & {kind: 'lizard'},
  fullToken: string
): Promise<CryptVerifyResult> => {
  // const {secret, strength} = cryptSignCypher;
  const tokenResult = extractToken(name, fullToken);
  if (tokenResult.status === 'failure') {
    return willFail(tokenResult.error);
  }

  const token = tokenResult.value;
  const protectedPayload = decodeJwt(token);
  const parsedResult = safeParse<CryptIdPayload>(protectedPayload, {
    schema: idPayloadSchema,
    formatting: 'privacy-first',
  });
  if (parsedResult.status === 'failure') {
    return willFail(JSON.stringify(parsedResult.error));
  }

  return succeed(parsedResult.value);
};
