'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the striking ' + chalk.red('jsonapi-express') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'service_name',
      message: 'Your service name, in snake_case',
      default: this.appname // Default to current folder name
    },
    {
      type: 'input',
      name: 'description',
      message: 'A short description',
      default: 'An amazing service'
    },
    {
      type: 'input',
      name: 'author',
      message: 'How is the author? Format: Your Name <your email>',
      store: true
    },
    {
      type: 'input',
      name: 'github_user',
      message: 'What\'s your Github username?',
      store: true
    },
    {
      type: 'input',
      name: 'docker_user',
      message: 'What\'s your Docker Hub username?',
      store: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.log('Nice! Generating %s structure ...', props.service_name);
    });
  }

  writing() {
    // Copy all templates and files
    this.fs.copyTpl(
      this.sourceRoot() + '/**',
      this.destinationRoot(),
      this.props
    );
    // NOTE(garcianavalon) I don't know why copyTpl doesn't give a shit about
    // globOptions. This copies hidden files like .gitignore
    const copyOptions = {
      globOptions: {
        dot: true
      }
    };
    this.fs.copy(
      this.sourceRoot() + '/.*',
      this.destinationRoot(),
      copyOptions
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
