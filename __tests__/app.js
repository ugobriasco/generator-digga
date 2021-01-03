'use strict';

const helpers = require('yeoman-test');
const path = require('path');
const assert = require('yeoman-assert');

describe('generator-digga:app', () => {
  jest.setTimeout(60000);

  describe("Minimal installation", () => {
    beforeAll(() => {
      const answers = {
        name: 'myApp',
        description: 'a test app',
        version: '0.0.0',
        database: 'none'
      };
      return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers)
    })
    it('generates a scaffold application', () => {
      assert.file([
            'README.MD',
            'index.js',
            'package.json',
            'prettier.config.js',
            '.travis.yml',
            '.gitignore',
            'lib/index.js',
            'lib/routes/index.js',
            'lib/helpers/index.js',
            'lib/config/index.js'
          ]);
    });
    it('does not include the api module', () => {
      assert.noFile(['lib/api/index.js'])
    })
  });   
});
