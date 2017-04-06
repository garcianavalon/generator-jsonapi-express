// Stub handler for reference and starting point
const BaseHandler = require('../core/base_handler');
const debug = require('debug')('<%= service_name %>:stub');

module.exports = class Stub extends BaseHandler {
  constructor(requestMessage, callback, silent) {
    super(requestMessage, callback, silent);

    this.response.data_type = 'stub';
    this.requiredParams = {
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
