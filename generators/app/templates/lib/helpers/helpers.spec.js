const validateEnv = require('./validate-env');

describe('validateEnv', () => {
  it('should return a validated environment', () => {
    const validatedEnv = validateEnv('stage');
    expect(validatedEnv).toBe('stage');
  });
  it('should return an error if an invalid env label ', () => {
    expect(() => {
      validateEnv('foo');
    }).toThrow();
  });
});
