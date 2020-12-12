'use strict';

const helpers = require('yeoman-test');
const path = require('path');
const assert = require('yeoman-assert');

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
