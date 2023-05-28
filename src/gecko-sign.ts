import {SignJWT} from 'jose';
import {type CryptSignCypher} from './crypt-model.js';
import {succeed, type Result} from './railway.js';

type SignResult = Result<string, string>;

const encodeSecret = (secret: string): Uint8Array =>
  new TextEncoder().encode(secret);

export const geckoSign =
  (
    name: string,
    cryptSignCypher: CryptSignCypher & {a: 'sign'; engine: 'gecko'}
  ) =>
  async (value: {id: string}): Promise<SignResult> => {
    const {privateKey, expiration} = cryptSignCypher;
    const secret = encodeSecret(privateKey);
    const realValue = {...value};
    const jwt = await new SignJWT(realValue)
      .setProtectedHeader({alg: 'HS256'})
      .setExpirationTime(`${expiration.value}s`)
      .sign(secret);
    return succeed(`${name}:${jwt}`);
  };
