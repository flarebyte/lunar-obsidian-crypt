import {stringEffectFields, stringFields} from 'faora-kai';
import {z} from 'zod';

const signCypher = z.object({
  a: z.literal('sign'),
  title: stringEffectFields.string1To50Line,
  engine: z.enum(['paseto/v4/sign']),
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
