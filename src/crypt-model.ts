import {describeEnum, stringEffectFields, stringFields} from 'faora-kai';
import {z} from 'zod';

const cypherTypes = {
  alligator: 'Alligator',
  gecko: 'Gecko',
  iguana: 'Iguana',
  komodo: 'Komodo Dragon',
  turtle: 'Turtle',
};

const signCypher = z.object({
  a: z.literal('sign'),
  title: stringEffectFields.string1To50Line,
  privateKey: stringFields.string1To600,
  publicKey: stringFields.string1To600.optional(),
  engine: z
    .enum(Object.keys(cypherTypes))
    .describe(describeEnum('Cypher engine:', cypherTypes)),
});

const cypher = z.discriminatedUnion('a', [signCypher]);

const schema = z
  .object({
    title: stringEffectFields.string1To50Line,
    cyphers: z.record(stringFields.stringKeyName, cypher),
  })
  .strict()
  .describe('A list of cyphers');

export type CryptModel = z.infer<typeof schema>;
