'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the striking ' + chalk.red('generator-jsonapi-express') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your service name',
      default: this.appname // Default to current folder name
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.log('Nice! Generating ', props.name);
    });
  }

  writing() {
    const source = this.sourceRoot();
    const destination = this.destinationRoot();
    this.fs.copy(
      source + '/**',
      destination,
      {
        globOptions: {
          dot: true
        }
      }
    );
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};
