'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = Generator.extend({
  prompting: function () {
    this.log('Generating your express project with JSON-pure API...');
  },

  writing: function () {
    this.fs.copy(
      // TODO(garcianavalon) copy all files in template folder automatically and
      // not declaratively
      //this.templatePath('dummyfile.txt'),
      //this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
