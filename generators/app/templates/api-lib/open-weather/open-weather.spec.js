const buildExclusionParams = require('./build-exclusion-params');

describe('API::OpenWeather', () => {
  it('Build a csv of exlusion parameters', () => {
    const arr = ['current', 'hourly', 'bananas'];
    const paramStr = buildExclusionParams(arr);
    expect(paramStr).toBe('current,hourly');
  });
  it('Returns undefined if no valid parameter presented', () => {
    const arr = ['kiwis', 'apples', 'bananas'];
    const paramStr = buildExclusionParams(arr);
    expect(paramStr).toBe(undefined);
  });
  it('Returns an undefined if no array is presented', () => {
    const paramStr = buildExclusionParams();
    expect(paramStr).toBe(undefined);
  });
});
