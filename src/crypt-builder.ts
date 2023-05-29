import {type CrypLizardCypher, type CryptModel} from './crypt-model.js';

export class CryptModelBuilder {
  private title = 'Not title yet';
  private cyphers: CryptModel['cyphers'] = {};

  public setTitle(title: string): this {
    this.title = title;
    return this;
  }

  public addLizard(name: string, opts: CrypLizardCypher): this {
    this.cyphers[name] = opts;
    return this;
  }

  public build(): CryptModel {
    return {title: this.title, cyphers: this.cyphers};
  }
}
