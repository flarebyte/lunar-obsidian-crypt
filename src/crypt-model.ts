import {describeEnum, stringEffectFields, stringFields} from 'faora-kai';
import {z} from 'zod';

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

const scopeValue = z.union([
  stringFields.string1To600,
  z.array(stringFields.string1To600),
]);

const lizardCypher = z.object({
  kind: z.literal('lizard').describe('Lizard 🦎'),
  title: stringEffectFields.string1To50Line,
  secret: z.instanceof(Uint8Array),
  altSecret: z.instanceof(Uint8Array).optional(),
  strength,
  expiration,
  expectedScope: z.record(stringFields.stringKeyName, scopeValue).optional(),
  scopeValidator: z
    .function()
    .args(z.record(stringFields.stringKeyName, scopeValue))
    .returns(z.boolean().or(stringFields.string1To140))
    .optional(),
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

export const idPayloadSchema = z
  .object({
    id: stringFields.string1To400,
    scope: z.record(stringFields.stringKeyName, scopeValue).optional(),
  })
  .strict()
  .describe('A list of cyphers');

export const idPayloadWithExpSchema = z
  .object({
    id: stringFields.string1To400,
    exp: z.number().positive().safe(),
    scope: z.record(stringFields.stringKeyName, scopeValue).optional(),
  })
  .strict()
  .describe('A list of cyphers');

type ValidationError = {
  message: string;
  path: string;
};

export type LunarObsidianCryptError =
  | {
      step: 'sign-id/validate-payload' | 'verify-id/validate-payload';
      errors: ValidationError[];
    }
  | {
      step:
        | 'sign-id/sign'
        | 'verify-id/extract-token'
        | 'verify-id/decode-token'
        | 'verify-id/verify-token'
        | 'verify-id/verify-scope'
        | 'verify-id/store'
        | 'sign-id/store';
      message: string;
      finalMessage?: string;
    };

export type LunarObsidianStoreModel = z.infer<typeof schema>;
export type CrypLizardCypher = z.infer<typeof lizardCypher>;
export type LunarObsidianCryptEncryptionStrength = z.infer<typeof strength>;
export type LunarObsidianCryptIdPayload = z.infer<typeof idPayloadSchema>;
export type CryptIdPayloadWithExp = z.infer<typeof idPayloadWithExpSchema>;
