import { LunarObsidianStoreBuilder } from './crypt-builder.js';
import {
  LunarObsidianCryptIdPayload,
  LunarObsidianCryptError,
  LunarObsidianStoreModel,
} from './crypt-model.js';
import { lizardSign, lizardVerify } from './lizard-sign.js';
import { Result, willFail } from './railway.js';
import { extractTokenPrefix } from './token-utils.js';

export class LunarObsidianCrypt<K extends string> {
  private store: LunarObsidianStoreModel = {
    title: 'No title yet',
    cyphers: {},
  };
  private prefixes: readonly string[] = [];

  constructor(
    builder: LunarObsidianStoreBuilder<K>,
    prefixes: readonly string[]
  ) {
    this.prefixes = prefixes;
    this.store = builder.build();
  }

  public async signId(
    name: K,
    payload: LunarObsidianCryptIdPayload
  ): Promise<Result<string, LunarObsidianCryptError>> {
    const cypher = this.store.cyphers[name];
    if (cypher === undefined) {
      return willFail({
        step: 'sign-id/store',
        message: `Not supported cypher ${name}`,
      });
    }
    switch (cypher.kind) {
      case 'translucent-lizard': {
        return await lizardSign(name, cypher, payload);
      }
      default: {
        return willFail({
          step: 'sign-id/store',
          message: `Not supported cypher ${cypher.kind}`,
        });
      }
    }
  }
  public async verifyIdByName(
    name: K,
    fullToken: string
  ): Promise<Result<LunarObsidianCryptIdPayload, LunarObsidianCryptError>> {
    const cypher = this.store.cyphers[name];
    if (cypher === undefined) {
      return willFail({
        step: 'verify-id/store',
        message: `Not supported cypher ${name}`,
      });
    }
    switch (cypher.kind) {
      case 'translucent-lizard': {
        return await lizardVerify(name, cypher, fullToken);
      }
      default: {
        return willFail({
          step: 'verify-id/store',
          message: `Not supported cypher ${cypher.kind}`,
        });
      }
    }
  }
  public async verifyId(
    fullToken: string
  ): Promise<Result<LunarObsidianCryptIdPayload, LunarObsidianCryptError>> {
    const prefixResult = extractTokenPrefix<K>(fullToken, this.prefixes);
    if (prefixResult.status === 'failure') {
      return willFail(prefixResult.error);
    }
    return this.verifyIdByName(prefixResult.value, fullToken);
  }
}
