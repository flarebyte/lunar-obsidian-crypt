import { LunarObsidianStoreBuilder } from "./crypt-builder.js";
import { CryptIdPayload, LunarObsidianStoreModel, CryptSignResult, CryptVerifyResult } from "./crypt-model.js";
import { lizardSign, lizardVerify } from "./lizard-sign.js";
import { willFail } from "./railway.js";

export class LunarObsidianCrypt<K extends string> {
    private store: LunarObsidianStoreModel = { title: 'No title yet', cyphers: {}};
    
    constructor(builder: LunarObsidianStoreBuilder<K>){
        this.store = builder.build();
    }

    public async signId(name: K, payload: CryptIdPayload): Promise<CryptSignResult>{
        const cypher = this.store.cyphers[name];
        if (cypher === undefined){
            return willFail(`Not supported cypher ${name}`)
        }
        switch(cypher.kind){
            case 'lizard': {
                return await lizardSign(name, cypher, payload);
            }
            default: {
                return willFail(`Not supported cypher ${cypher.kind}`)
            }
            }
                
        }
        public async verifyIdSignature(name: K, fullToken: string): Promise<CryptVerifyResult>{
            const cypher = this.store.cyphers[name];
            if (cypher === undefined){
                return willFail(`Not supported cypher ${name}`)
            }
            switch(cypher.kind){
                case 'lizard': {
                    return await lizardVerify(name, cypher, fullToken);
                }
                default: {
                    return willFail(`Not supported cypher ${cypher.kind}`)
                }
                }
                    
            }
    }


