const parseCommaSeparatedString = (buffer, fragment) =>
  buffer === '' ? fragment : `,${fragment}`;

const buildExclusionParams = arr => {
  if (!arr) return undefined;
  const paramsEnabled = ['current', 'minutely', 'hourly', 'daily', 'alerts'];

  const selection = arr.filter(param => paramsEnabled.includes(param));

  if (selection.length > 0) {
    return selection.reduce((buffer, param) => {
      const fragment = parseCommaSeparatedString(buffer, param);
      return buffer + fragment;
    });
  } else {
    return undefined;
  }
};

module.exports = { buildExclusionParams, parseCommaSeparatedString };
