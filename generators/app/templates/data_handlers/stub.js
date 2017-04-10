// Stub handler for reference and starting point
const BaseHandler = require('../core/base_handler');
const debug = require('debug')('<%= service_name %>:stub');

module.exports = class Stub extends BaseHandler {
  constructor(request, callback, silent) {
    super(request, callback, silent);

    this.requiredFields = {
      create: [],
      retrieve: [],
      update: [],
      delete: []
    };
  }

  create() {
    // Do your stuff
    debug('Stub handler for create action executed');
    this.success();
  }

  retrieve() {
    // Do your stuff
    debug('Stub handler for retrie action executed');
    this.success();
  }

  update() {
    // Do your stuff
    debug('Stub handler for update action executed');
    this.success();
  }

  delete() {
    // Do your stuff
    debug('Stub handler for delete action executed');
    this.success();
  }
};
