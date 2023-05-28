import {EncryptJWT, base64url} from 'jose';
import {type CryptSignCypher} from './crypt-model.js';
import {succeed, type Result} from './railway.js';

type SignResult = Result<string, string>;

export const alligatorSign =
  (
    name: string,
    cryptSignCypher: CryptSignCypher & {a: 'sign'; engine: 'alligator'}
  ) =>
  async (value: {id: string}): Promise<SignResult> => {
    const {privateKey, expiration} = cryptSignCypher;
    const encPrivateKey = base64url.decode(privateKey);
    const realValue = {...value};
    const jwt = await new EncryptJWT(realValue)
      .setProtectedHeader({alg: 'HS256'})
      .setExpirationTime(`${expiration.value}`)
      .encrypt(encPrivateKey);
    return succeed(`${name}:${jwt}`);
  };
