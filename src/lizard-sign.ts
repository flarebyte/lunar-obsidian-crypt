import {SignJWT, decodeJwt} from 'jose';
import {
  type CryptIdPayload,
  type CryptEncryptionStrength,
  type CryptSignCypher,
} from './crypt-model.js';
import {succeed, type Result} from './railway.js';

type SignResult = Result<string, string>;

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

export const lizardSign =
  (name: string, cryptSignCypher: CryptSignCypher & {kind: 'lizard'}) =>
  async (value: CryptIdPayload): Promise<SignResult> => {
    const {secret, expiration, strength} = cryptSignCypher;
    const realValue = {...value};
    const jwt = await new SignJWT(realValue)
      .setProtectedHeader({alg: strenghtToAlgorithm(strength)})
      .setExpirationTime(`${expiration.value}s`)
      .sign(secret);
    return succeed(`${name}:${jwt}`);
  };

export const lizardVerify =
  (name: string, cryptSignCypher: CryptSignCypher & {kind: 'lizard'}) =>
  async (value: {id: string}): Promise<SignResult> => {
    const {secret, expiration, strength} = cryptSignCypher;
    const realValue = {...value};
    const jwt = await new SignJWT(realValue)
      .setProtectedHeader({alg: strenghtToAlgorithm(strength)})
      .setExpirationTime(`${expiration.value}s`)
      .sign(secret);
    return succeed(`${name}:${jwt}`);
  };
