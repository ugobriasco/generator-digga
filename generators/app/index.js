'use strict';
// https://github.com/cdimascio/generator-express-no-stress/blob/master/app/index.js
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', { type: String, required: false });

    this.name = this.options.appname || '_myapp';
    this.description = 'My cool app';
    this.version = '1.0.0';
  }

  initializing() {}

  async prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'description',
        message: `App description [${this.description}]`
      },
      {
        type: 'input',
        name: 'apiVersion',
        message: `Version [${this.version}]`
      }
    ];

    if (!this.options.appname) {
      prompts.unshift({
        type: 'input',
        name: 'name',
        message: `App name [${this.name}]`
      });
    }

    await this.prompt(prompts).then(r => {
      this.name = r.name ? r.name : this.name;
      this.description = r.description ? r.description : this.description;
      this.version = r.version ? r.version : this.version;
    });
  }

  configuring() {}

  default() {}

  get writing() {
    return {
      appStaticFiles() {
        console.log('name');
        console.log(this.name);
        console.log(this.sourceRoot());

        const src = this.sourceRoot();
        const dest = this.destinationPath(this.name);
        const files = ['package.json', 'gitignore'];
        const opts = {
          name: this.name,
          description: this.description,
          version: this.version
        };

        this.fs.copy(src, dest);

        files.forEach(f => {
          this.fs.copyTpl(
            this.templatePath(f),
            this.destinationPath(`${this.name}/${f}`),
            opts
          );
        });
        this.fs.move(
          this.destinationPath(`${this.name}`, 'gitignore'),
          this.destinationPath(`${this.name}`, '.gitignore')
        );
      }
    };
  }

  conflicts() {}

  install() {}

  end() {}
};
