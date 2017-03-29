// Stub handler for reference and starting point
const BaseHandler = require('../base_handler');
const debug = require('debug')('jsonapi:stub');

module.exports = class Stub extends BaseHandler {
  constructor(requestMessage, callback) {
    super(requestMessage, callback);

    this.dataType = 'stub';
    this.requiredParams = {
      create: [],
      retrieve: [],
      update: [],
      delete: []
    };
  }

  create() {
    // Do your stuff
    this.callback(this.responseMessage);
  }

  retrieve() {
    // Do your stuff
    this.callback(this.responseMessage);
  }

  update() {
    // Do your stuff
    this.callback(this.responseMessage);
  }

  delete() {
    // Do your stuff
    this.callback(this.responseMessage);
  }
};
