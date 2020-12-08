'use strict';

const helpers = require('yeoman-test');

describe('generator-digga:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true });
  });

  it('say yes', () => {
    assert(true);
  });
});
