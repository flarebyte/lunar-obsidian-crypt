import { z } from 'zod';
import { stringy } from './field-validation.js';

const signCypher = z.object({
  a: z.literal('sign'),
  title: stringy.title,
  engine: z.enum(['paseto/v4/sign']),
});

const cypher = z.discriminatedUnion('a', [signCypher]);

const schema = z
  .object({
    title: stringy.title,
    cyphers: z.record(stringy.customKey, cypher),
  })
  .strict()
  .describe('A list of cyphers');

export type CryptModel = z.infer<typeof schema>;
