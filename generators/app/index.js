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
    this.database = false;
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
      },
      {
        type: 'list',
        name: 'database',
        message: 'Which database do you want to have?',
        default: ['none'],
        choices: ['none', 'MongoDB', { name: 'Static files' }]
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
      this.database = r.database;
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
        console.log(this.database);

        const src = this.sourceRoot();
        const dest = this.destinationPath(this.name);
        const files = ['package.json', 'gitignore'];
        const opts = {
          name: this.name,
          description: this.description,
          version: this.version
        };

        this.fs.copy(src, dest);

        // Database
        if (this.database == 'MongoDB') {
          //change index.js
          this.fs.copy(`${src}/lib/index.js`, `${dest}/lib/index.js`, {
            process: function(content) {
              var regEx = new RegExp('//db', 'g');
              var newContent = content.toString().replace(regEx, '//db_MONGO');
              return newContent;
            }
          });
          // add dependancies in package.json

          // add db module
        }

        files.forEach(f => {
          this.fs.copyTpl(
            this.templatePath(f),
            this.destinationPath(`${this.name}/${f}`),
            opts
          );
        });

        // Fix .gitignore
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
