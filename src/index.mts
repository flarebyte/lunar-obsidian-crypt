import { LunarObsidianStoreBuilder } from "./crypt-builder.js";
import { LunarObsidianCryptIdPayload, LunarObsidianCryptError, LunarObsidianStoreModel } from "./crypt-model.js";
import { lizardSign, lizardVerify } from "./lizard-sign.js";
import { Result, willFail } from "./railway.js";

export class LunarObsidianCrypt<K extends string> {
    private store: LunarObsidianStoreModel = { title: 'No title yet', cyphers: {}};
    
    constructor(builder: LunarObsidianStoreBuilder<K>){
        this.store = builder.build();
    }

    public async signId(name: K, payload: LunarObsidianCryptIdPayload): Promise<Result<string, LunarObsidianCryptError>>{
        const cypher = this.store.cyphers[name];
        if (cypher === undefined){
            return willFail({step: 'sign-id/store',message: `Not supported cypher ${name}`})
        }
        switch(cypher.kind){
            case 'lizard': {
                return await lizardSign(name, cypher, payload);
            }
            default: {
                return willFail({step: 'sign-id/store',message: `Not supported cypher ${cypher.kind}`})
            }
            }
                
        }
        public async verifyId(name: K, fullToken: string): Promise<Result<LunarObsidianCryptIdPayload, LunarObsidianCryptError>>{
            const cypher = this.store.cyphers[name];
            if (cypher === undefined){
                return willFail({step: 'verify-id/store',message: `Not supported cypher ${name}`})
            }
            switch(cypher.kind){
                case 'lizard': {
                    return await lizardVerify(name, cypher, fullToken);
                }
                default: {
                    return willFail({step: 'verify-id/store',message:`Not supported cypher ${cypher.kind}`})
                }
                }
                    
            }
    }


