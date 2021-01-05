const { buildExclusionParams, parseCommaSeparatedString } = require('./build-exclusion-params');

describe('API::OpenWeather', () => {

  describe('API::OpenWeather::buildExclusionParams', () => {
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
    describe('API::OpenWeather::buildExclusionParams::parseCommaSeparatedString', () => { 
      it('it parse a comma if the bufferStr is not empty', () => {
        const str = parseCommaSeparatedString('hello', 'there');
        expect(str).toBe(',there');
      })
      it('it parse no comma if the bufferStr is empty', () => {
        const str = parseCommaSeparatedString('', 'hello');
        expect(str).toBe('hello');
      })
    })
  });

  
  
});
