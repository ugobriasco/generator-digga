'use strict';
// https://github.com/cdimascio/generator-express-no-stress/blob/master/app/index.js
// https://github.com/arthurfauq/generator-exprest-api/blob/master/generators/app/index.js

const Generator = require('yeoman-generator');
const yosay = require('yosay');
const { join } = require('path');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);
    this.argument('noInstall', { type: Boolean, required: false }); //skip npm i
  }

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
        name: 'typescript',
        message: `Do you want to use Typescript?`,
        default: [false],
        choices: [
          { name: 'no', value: false },
          { name: 'yes', value: true }
        ]
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
    const dest = (path) =>
      this.destinationPath.bind(this)(`${appName}/${path}`);

    // Dependencies injection
    this.dependencies = ['axios', 'body-parser', 'cors', 'express'];
    this.devDependencies = [
      'jest',
      'dependency-cruiser',
      'eslint',
      'lint-staged',
      'prettier'
    ];
    if (answers.typescript) {
      this.devDependencies.push('@types/node');
    }
    if (answers.database == 'MongoDB') {
      this.dependencies.push('mongoose');
    }
    if (answers.api.includes('auth0')) {
      this.dependencies.push('express-jwt');
      this.dependencies.push('jwks-rsa');
    }

    if (answers.typescript) {
      copy(src('.tsconfig.json'), dest('.tsconfig.json'));
    }

    //./
    copy(src('gitignore'), dest('.gitignore'));
    copy(src('prettier.config.js'), dest('prettier.config.js'));
    copy(src('travis.yml'), dest('.travis.yml'));
    copyTpl(src('README.MD'), dest('README.MD'), answers);
    copyTpl(src('package.json'), dest('package.json'), answers);

    if (answers.typescript) {
      copyTpl(src('index.ts'), dest('index.ts'), answers);
    } else {
      copyTpl(src('index.js'), dest('index.js'), answers);
    }

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

  async install() {
    const appDir = join(process.cwd(), this.answers.name);

    process.chdir(appDir);

    await this.installDependencies({ npm: true, bower: false, yarn: false });

    // skip installation of npm packages, to speed up integration tests
    if (!this.options.noInstall) {
      this.spawnCommandSync('npm', ['i', '--save', ...this.dependencies]);
      this.spawnCommandSync('npm', [
        'i',
        '--save-dev',
        ...this.devDependencies
      ]);
      this.spawnCommandSync('npm', ['run', 'build:deptree']);
    }
  }

  end() {
    this.log(yosay('All done !'));
  }
};
