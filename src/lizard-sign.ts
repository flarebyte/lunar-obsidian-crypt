import {SignJWT} from 'jose';
import {
  type CryptIdPayload,
  type CryptEncryptionStrength,
  type CrypLizardCypher,
  type CryptSignResult,
} from './crypt-model.js';
import {succeed} from './railway.js';

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
