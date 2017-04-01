'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-jsonapi-express:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({name: 'testing'});
  });

  it('creates files', () => {
    assert.file([
      'core/core.js',
      'core/base_handler.js',
      'core/transconsole.js',
      'core/data_handlers/stub.js',
      'core/models/stub.js',
      'config/actions.js',
      'config/db.js',
      'bin/www',
      'routes/http_adapter.js',
      'test/core/core.test.js',
      'test/core/base_handler.test.js',
      'test/core/transconsole.test.js',
      'test/core/data_handlers/stub.test.js',
      'test/app.test.js',
      '.gitignore',
      'app.js',
      'docker-compose.test.yml',
      'docker-compose.yml',
      'Dockerfile',
      'package.json',
      'README.md'
    ]);
  });
});
