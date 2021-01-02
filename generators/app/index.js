'use strict';
// https://github.com/cdimascio/generator-express-no-stress/blob/master/app/index.js
// https://github.com/arthurfauq/generator-exprest-api/blob/master/generators/app/index.js

const Generator = require('yeoman-generator');
const yosay = require('yosay');
const { join } = require('path');

module.exports = class extends Generator {
  initializing() {}

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: `App name`,
        default: 'myapp'
      },
      {
        type: 'input',
        name: 'description',
        message: `App description?`,
        default: 'my app description'
      },
      {
        type: 'input',
        name: 'version',
        message: `Version`,
        default: '0.0.0'
      },
      {
        type: 'list',
        name: 'database',
        message: 'Which database do you want to have?',
        default: ['none'],
        choices: ['none', 'MongoDB']
      },
      {
        type: 'checkbox',
        name: 'api',
        message: 'Which API adapter should I prime? (press Enter to skip)',
        choices: [
          { name: 'Open Weather', value: 'openWeather' },
          { name: 'Auth0 authentication', value: 'auth0' }
        ],
        default: []
      }
    ]);
  }

  configuring() {}

  default() {}

  writing() {
    const { answers } = this;
    const appName = answers.name;
    const copy = this.fs.copy.bind(this.fs);
    const copyTpl = this.fs.copyTpl.bind(this.fs);
    const src = this.templatePath.bind(this);
    const dest = path => this.destinationPath.bind(this)(`${appName}/${path}`);

    // Dependencies injection
    this.dependencies = ['axios', 'body-parser', 'cors', 'express'];
    this.devDependencies = [
      'jest',
      'dependency-cruiser',
      'eslint',
      'lint-staged',
      'prettier'
    ];
    if (answers.database == 'MongoDB') {
      this.dependencies.push('mongoose');
    }
    if (answers.api.includes('auth0')) {
      this.dependencies.push('express-jwt');
      this.dependencies.push('jwks-rsa');
    }

    //./
    copy(src('gitignore'), dest('.gitignore'));
    copy(src('prettier.config.js'), dest('prettier.config.js'));
    copyTpl(src('README.MD'), dest('README.MD'), answers);
    copyTpl(src('package.json'), dest('package.json'), answers);
    copyTpl(src('index.js'), dest('index.js'), answers);

    // lib
    copyTpl(src('lib/index.js'), dest('lib/index.js'), {
      mongoose: answers.database == 'MongoDB'
    });

    // lib/config
    copyTpl(src('lib/config/index.js'), dest('lib/config/index.js'), {
      ...answers,
      api: answers.api.length > 0,
      mongoose: answers.database == 'MongoDB'
    });
    copyTpl(dest('lib/config/index.js'), dest('lib/config/index.js.template'));

    copy(src('lib/helpers'), dest('lib/helpers'));
    copy(src('lib/routes'), dest('lib/routes'));

    // lib/api
    if (answers.api.length > 0) {
      const apiOptions = {
        openWeather: answers.api.includes('openWeather'),
        auth0: answers.api.includes('auth0')
      };
      copyTpl(src('lib/api/index.js'), dest('lib/api/index.js'), apiOptions);
      copyTpl(
        src('api-lib/api.config.js'),
        dest('lib/config/api.config.js'),
        apiOptions
      );

      // copy single modules
      if (apiOptions.openWeather) {
        copy(src('api-lib/open-weather'), dest('lib/api/open-weather'));
      }
      if (apiOptions.auth0) {
        copy(src('api-lib/auth0'), dest('lib/api/auth0'));
      }
    }
  }

  conflicts() {}

  install() {
    const appDir = join(process.cwd(), this.answers.name);

    process.chdir(appDir);

    this.installDependencies({ bower: false, npm: true }).then(() => {
      this.spawnCommandSync('npm', ['i', '--save', ...this.dependencies]);
      this.spawnCommandSync('npm', [
        'i',
        '--save-dev',
        ...this.devDependencies
      ]);
    });
  }

  end() {
    this.log(yosay('All done !'));
  }
};
