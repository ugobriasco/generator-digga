'use strict';

const helpers = require('yeoman-test');
const path = require('path');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('generator-digga:app', () => {
 
  describe("Genereate minimal app", () => {
    beforeAll(() => {
      const answers = {
        name: 'minimal-app',
        description: 'a test app',
        version: '0.0.0',
        database: 'none'
      };
      return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers)
      .withArguments(['noInstall']) 
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


  describe("Generate app with api modules", () => {
    beforeAll(() => {
      const answers = {
        name: 'full-api-app',
        description: 'a test app',
        version: '0.0.0',
        database: 'none',
        api: ['openWeather','auth0']
      };
      return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers)
      .withArguments(['noInstall']) 
    })
    it('generates a scaffold application, including api module', () => {
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
            'lib/config/index.js',
            'lib/config/api.config.js',
            'lib/api/index.js'
          ]);
    });
  });

  describe("Generate app with mongoDB", () => {
    beforeAll(() => {
      const answers = {
        name: 'full-api-app',
        description: 'a test app',
        version: '0.0.0',
        database: 'mongoDB'
      };
      return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers)
      .withArguments(['noInstall']) 
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
  });


  describe("Installs dependencies after generation", () => {
    jest.setTimeout(60000);
    beforeAll(() => {
      const answers = {
        name: 'app',
        description: 'a test app',
        version: '0.0.0',
        database: 'none'
      };
      return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts(answers)
    })
    it('injects dependendies', () => {
      assert.noFileContent('package.json', 'dependencies: {}');
      assert.noFileContent('package.json', 'devDependencies: {}');
    });
  });  
});
