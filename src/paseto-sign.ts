import {type CryptModel} from './crypt-model.js';
import {type Result} from './railway.js';

type SignResult = Result<string, string>;

const pasetoSignId =
  (cryptModel: CryptModel, name: string) =>
  async (value: {id: string}): Promise<SignResult> => {
    const cypher = cryptModel.cyphers[name];
    const privateKey = '';
    const expiration = '';
    const realValue = {...value, expiration};
    const encryped = await V4.sign(realValue, privateKey);
    return {status: 'success', value: `${name}:${encrypted}`};
  };
