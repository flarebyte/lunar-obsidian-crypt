import {describeEnum, stringEffectFields, stringFields} from 'faora-kai';
import {z} from 'zod';

const timeUnit: Record<string, string> = {
  seconds: 'Seconds',
  minutes: 'Minutes',
  hours: 'Hours',
  days: 'Days',
  weeks: 'Weeks',
};

const timeUnitKeys = ['seconds', 'minutes', 'hours', 'days', 'weeks'] as const;

const encryptionStrength = {
  sufficient: 'Sufficient',
  good: 'Good',
  strong: 'Strong',
};

const encryptionStrengthKeys = ['sufficient', 'good', 'strong'] as const;

const strength = z
  .enum(encryptionStrengthKeys)
  .describe(describeEnum('Encryption strength:', encryptionStrength));

const expiration = z
  .object({
    value: z
      .number()
      .min(1)
      .max(1_000_000)
      .int()
      .describe('The expiration value using the selected unit'),
    unit: z.enum(timeUnitKeys).describe(describeEnum('Time unit: ', timeUnit)),
  })
  .strict()
  .describe('A relative time in the future at which the token should expire');

const scopeValue = z.union([
  stringFields.string1To600,
  z.array(stringFields.string1To600),
]);

const lizardCypher = z.object({
  kind: z
    .literal('translucent-lizard')
    .describe(
      'Translucent lizard 🦎. Based on JSON Web Token, it uses a secret to create and verify a signature. The payload is always visible'
    ),
  title: stringEffectFields.string1To50Line.describe(
    'A short title to describe the purpose of this encryption'
  ),
  secret: z
    .instanceof(Uint8Array)
    .describe('A very long secret that should ideally be randomly generated'),
  altSecret: z
    .instanceof(Uint8Array)
    .optional()
    .describe('The previous very long secret'),
  strength,
  expiration,
  expectedScope: z
    .record(stringFields.stringKeyName, scopeValue)
    .optional()
    .describe('A reference scope that should be matched if present'),
  scopeValidator: z
    .function()
    .args(z.record(stringFields.stringKeyName, scopeValue))
    .returns(z.boolean().or(stringFields.string1To140))
    .optional()
    .describe('Optional validator for the scope'),
});

const cypher = z
  .discriminatedUnion('kind', [lizardCypher])
  .describe('A selection of custom cypher');

const schema = z
  .object({
    title: stringEffectFields.string1To50Line.describe(
      'Informative title for the whole store'
    ),
    cyphers: z
      .record(stringFields.stringKeyName, cypher)
      .describe('A list of cyphers for signing payload'),
  })
  .strict()
  .describe('A store with a list of cyphers');

export const idPayloadSchema = z
  .object({
    id: stringFields.string1To400.describe(
      'An unique ID to represent a resource'
    ),
    scope: z
      .record(stringFields.stringKeyName, scopeValue)
      .optional()
      .describe('A scope that clarifies the usage of the ID'),
  })
  .strict()
  .describe('A payload with at least an ID');

export const idPayloadWithExpSchema = z
  .object({
    id: stringFields.string1To400,
    exp: z.number().positive().safe(),
    scope: z.record(stringFields.stringKeyName, scopeValue).optional(),
  })
  .strict()
  .describe('A payload with at least an ID and an expiration field');

type ValidationError = {
  message: string;
  path: string;
};

/** An error that could be returned by lunar obsidian crypt */
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
export type LunarObsidianCrypTranslucentLizard = z.infer<typeof lizardCypher>;
export type LunarObsidianCryptEncryptionStrength = z.infer<typeof strength>;
export type LunarObsidianCryptIdPayload = z.infer<typeof idPayloadSchema>;
export type CryptIdPayloadWithExp = z.infer<typeof idPayloadWithExpSchema>;
