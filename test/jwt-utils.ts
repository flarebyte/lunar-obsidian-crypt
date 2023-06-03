export const looksLikeJwt = (prefix: string) => (value: string) => {
  if (!value.startsWith(prefix)) {
    return false;
  }

  const splitted = value.split('.');
  const hasTwoDots = splitted.length === 3;
  if (
    !hasTwoDots ||
    splitted[0] === undefined ||
    splitted[1] === undefined ||
    splitted[2] === undefined
  ) {
    return false;
  }

  if (splitted[0].length < 15) {
    return false;
  }

  if (splitted[1].length < 30) {
    return false;
  }

  if (splitted[2].length < 30) {
    return false;
  }

  return true;
};
