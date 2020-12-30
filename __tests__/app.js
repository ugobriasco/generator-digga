'use strict';

const helpers = require('yeoman-test');
const path = require('path');
const assert = require('yeoman-assert');

describe('generator-digga:app', () => {
  jest.setTimeout(30000);

  it('scaffolds a full project', () => {
    const answers = {
      name: 'myApp',
      description: 'a test app',
      version: '0.0.0',
      database: 'none'
    };
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers)
      .then(() => {
        console.log(path.join(__dirname, '../generators/app'));
        assert.file([
          'README.MD',
          'index.js',
          'package.json',
          'prettier.config.js'
        ]);
      });
  });
});
