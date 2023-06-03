import {type LunarObsidianStoreBuilder} from './crypt-builder.js';
import {
  type LunarObsidianCryptIdPayload,
  type LunarObsidianCryptError,
  type LunarObsidianStoreModel,
} from './crypt-model.js';
import {
  translucentLizardSignId,
  translucentLizardVerifyId,
} from './translucent-lizard.js';
import {type Result, willFail} from './railway.js';
import {extractTokenPrefix} from './token-utils.js';

export class LunarObsidianCrypt<K extends string> {
  private readonly store: LunarObsidianStoreModel = {
    title: 'No title yet',
    cyphers: {},
  };

  private readonly prefixes: readonly string[] = [];

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
        return translucentLizardSignId(name, cypher, payload);
      }

      default: {
        return willFail({
          step: 'sign-id/store',
          message: `Not supported cypher ${cypher.kind}`,
        });
      }
    }
  }

  public async verifyIdByPrefix(
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
        return translucentLizardVerifyId(name, cypher, fullToken);
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

    return this.verifyIdByPrefix(prefixResult.value, fullToken);
  }
}
