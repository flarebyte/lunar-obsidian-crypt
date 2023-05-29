import { CryptIdPayload, CryptModel } from "./crypt-model.js";
import { lizardSign } from "./lizard-sign.js";
import { willFail } from "./railway.js";

export class LunarObsidianCrypt {
    private store: CryptModel = { title: 'No title yet', cyphers: {}};
    
    constructor(store: CryptModel){
        this.store = store;
    }

    public async signId(name: string, payload: CryptIdPayload){
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
    }


