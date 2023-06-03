import {type LunarObsidianCryptError} from './crypt-model.js';
import {type Result, succeed, willFail} from './railway.js';

/** Extract a JWT token from the full token with prefix */
export const extractToken = (
  prefix: string,
  fullToken: string
): Result<string, LunarObsidianCryptError> => {
  const [token, ...prefixParts] = fullToken.split(':').reverse();
  const actualPrefix = prefixParts.reverse().join(':');
  if (actualPrefix !== prefix) {
    return willFail({
      step: 'verify-id/extract-token',
      message: `Prefix should be ${prefix} not ${actualPrefix}`,
    });
  }

  if (token === undefined) {
    return willFail({
      step: 'verify-id/extract-token',
      message: 'There is no token',
    });
  }

  return succeed(token);
};

/** Extract the full token prefix */
export const extractTokenPrefix = <K extends string>(
  fullToken: string,
  supported: readonly string[]
): Result<K, LunarObsidianCryptError> => {
  const [_token, ...prefixParts] = fullToken.split(':').reverse();
  const actualPrefix = prefixParts.reverse().join(':');
  if (actualPrefix === undefined || actualPrefix.length === 0) {
    return willFail({
      step: 'verify-id/extract-token',
      message: `Could not extract the prefix for the JWT token`,
    });
  }

  const isSupported = (text: string): text is K =>
    supported.some((s) => `${s}` === text);

  if (!isSupported(actualPrefix)) {
    return willFail({
      step: 'verify-id/extract-token',
      message: `The prefix for the JWT token is not supported`,
    });
  }

  return succeed(actualPrefix);
};
