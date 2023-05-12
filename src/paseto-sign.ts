import { CryptModel } from './crypt-model.js';
import { Result } from './railway.js';
import { V4 } from 'paseto';

type SignResult = Result<string, string>;

const pasetoSignId =
  (cryptModel: CryptModel, name: string) =>
  async (value: { id: string }): Promise<SignResult> => {
    const cypher = cryptModel.cyphers[name];
    const privateKey = '';
    const expiration = '';
    const realValue = { ...value, expiration };
    const encryped = await V4.sign(realValue, privateKey);
    return { status: 'success', value: `${name}:${encrypted}` };
  };
