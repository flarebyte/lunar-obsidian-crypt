import {
  type CrypLizardCypher,
  type LunarObsidianStoreModel,
} from './crypt-model.js';

export class LunarObsidianStoreBuilder<K extends string> {
  private title = 'Not title yet';
  private cyphers: LunarObsidianStoreModel['cyphers'] = {};

  public setTitle(title: string): this {
    this.title = title;
    return this;
  }

  public addLizard(name: K, opts: CrypLizardCypher): this {
    this.cyphers[name] = opts;
    return this;
  }

  public build(): LunarObsidianStoreModel {
    return {title: this.title, cyphers: this.cyphers};
  }
}
