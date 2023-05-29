import {describeEnum, stringEffectFields, stringFields} from 'faora-kai';
import {z} from 'zod';
import {type Result} from './railway.js';

const timeUnit: Record<string, string> = {
  seconds: 'Seconds',
  minutes: 'Minutes',
  hours: 'Hours',
  days: 'Days',
  weeks: 'Weeks',
  months: 'Months',
};

const timeUnitKeys = [
  'seconds',
  'minutes',
  'hours',
  'days',
  'weeks',
  'months',
] as const;

const encryptionStrength = {
  sufficient: 'Sufficient',
  good: 'Good',
  strong: 'Strong',
};

const encryptionStrengthKeys = ['sufficient', 'good', 'strong'] as const;

const strength = z
  .enum(encryptionStrengthKeys)
  .describe(describeEnum('Encryption strength:', encryptionStrength));

const expiration = z.object({
  value: z.number().min(1).max(1_000_000).int(),
  unit: z.enum(timeUnitKeys).describe(describeEnum('Time unit: ', timeUnit)),
});

const lizardCypher = z.object({
  kind: z.literal('lizard').describe('Lizard 🦎'),
  title: stringEffectFields.string1To50Line,
  secret: z.instanceof(Uint8Array),
  strength,
  expiration,
});

const crocodileCypher = z.object({
  kind: z.literal('crocodile').describe('Crocodile 🐊'),
  title: stringEffectFields.string1To50Line,
  expiration,
});

const turtleCypher = z.object({
  kind: z.literal('turtle').describe('Turtle 🐢'),
  title: stringEffectFields.string1To50Line,
  expiration,
});

const cypher = z.discriminatedUnion('kind', [
  lizardCypher,
  crocodileCypher,
  turtleCypher,
]);

const schema = z
  .object({
    title: stringEffectFields.string1To50Line,
    cyphers: z.record(stringFields.stringKeyName, cypher),
  })
  .strict()
  .describe('A list of cyphers');

const scopeValue = z.union([
  stringFields.string1To600,
  z.array(stringFields.string1To600),
]);

const idPayloadSchema = z
  .object({
    id: stringFields.string1To400,
    scope: z.record(stringFields.stringKeyName, scopeValue).optional(),
  })
  .strict()
  .describe('A list of cyphers');

export type CryptModel = z.infer<typeof schema>;
export type CrypLizardCypher = z.infer<typeof lizardCypher>;
export type CryptEncryptionStrength = z.infer<typeof strength>;
export type CryptIdPayload = z.infer<typeof idPayloadSchema>;
export type CryptSignResult = Result<string, string>;
