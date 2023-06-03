import {
  type LunarObsidianCrypTranslucentLizard,
  type LunarObsidianStoreModel,
} from './crypt-model.js';

/**
 * Builder for the lunar obsidian store
 */
export class LunarObsidianStoreBuilder<K extends string> {
  private title = 'Not title yet';
  private cyphers: LunarObsidianStoreModel['cyphers'] = {};

  /** Set an informative title for the whole store */
  public setTitle(title: string): this {
    this.title = title;
    return this;
  }

  /** Add configuration for translucent lizard 🦎. Based on JSON Web Token, it uses a secret to create and verify a signature. The payload is always visible */
  public addTranslucentLizard(
    name: K,
    opts: Omit<LunarObsidianCrypTranslucentLizard, 'kind'>
  ): this {
    this.cyphers[name] = {...opts, kind: 'translucent-lizard'};
    return this;
  }

  /** Build the  model */
  public build(): LunarObsidianStoreModel {
    return {title: this.title, cyphers: this.cyphers};
  }
}
