'use strict';
// https://github.com/cdimascio/generator-express-no-stress/blob/master/app/index.js
// https://github.com/arthurfauq/generator-exprest-api/blob/master/generators/app/index.js

const Generator = require('yeoman-generator');
const yosay = require('yosay');
const { join } = require('path');

module.exports = class extends Generator {
  // constructor(args, opts) {
  //   super(args, opts);
  //   this.argument('appname', { type: String, required: false });
  //   this.name = this.optons.appname || '_myapp';
  //   this.description = 'My cool app';
  //   this.version = '1.0.0';
  //   this.database = false;
  // }

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
        choices: ['none', 'MongoDB', { name: 'Static files' }]
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
      'chai',
      'mocha',
      'dependency-cruiser',
      'eslint',
      'lint-staged',
      'prettier'
    ];
    if (answers.database == 'MongoDB') {
      this.dependencies.push('mongoose');
    }

    //./
    copy(src('gitignore'), dest('.gitignore'));
    copy(src('prettier.config.js'), dest('prettier.config.js'));
    copyTpl(src('README.MD'), dest('README.MD'), answers);
    copyTpl(src('package.json'), dest('package.json'), answers);
    copyTpl(src('index.js'), dest('index.js'), answers);

    //./lib
    copyTpl(src('lib/index.js'), dest('lib/index.js'), {
      mongoose: answers.database == 'MongoDB'
    });
    copyTpl(src('lib/config.js'), dest('lib/config.js'), {
      ...answers,
      mongoose: answers.database == 'MongoDB'
    });
    copy(dest('lib/config.js'), dest('lib/config.js.template'));

    copy(src('lib/helpers'), dest('lib/helpers'));
    copy(src('lib/routes'), dest('lib/routes'));
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
