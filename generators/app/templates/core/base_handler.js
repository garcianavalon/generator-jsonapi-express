const Transconsole = require('./transconsole');
const debug = require('debug')('jsonapi:stub');
const ACTIONS = require('../config/actions');

module.exports = class BaseHandler extends Transconsole {
  constructor(requestMessage, callback, silent) {
    super(requestMessage, silent);
    this._callback = callback;

    // This should be overrided by action_handlers
    this.response.data_type = 'base_handler';
    this.requiredFields = [];
  }

  _getResponseActionString(status) {
    if (!this.request || !this.request.action_str || !ACTIONS[this.request.action_str]) {
      return ACTIONS.error;
    }
    return ACTIONS[this.request.action_str][status];
  }

  success() {
    this.response.action_str = this._getResponseActionString('success');
    this._callback(this.response);
  }

  failure() {
    this.response.action_str = this._getResponseActionString('failure');
    this._callback(this.response);
  }

  _validateRequestData() {
    const requestData = this.response.request_map;

    for (let field of this.requiredFields) {
      if (field in requestData) {
        continue;
      }
      debug(`${field} missing in request_map for request ${this.response}`);
      this.error(`${field} required in request_map`);
      return true;
    }

    return false;
  }

  _notImplemented(action) {
    this.error(`${action} handler not implemented for data_type ${this.response.data_type}`);
    this.failure();
  }

  create() {
    this._notImplemented('create');
  }

  retrieve() {
    this._notImplemented('retrieve');
  }

  update() {
    this._notImplemented('update');
  }

  delete() {
    this._notImplemented('delete');
  }

  handle() {
    // Validate required params
    const error = this._validateRequestData();
    if (error) {
      return this.failure();
    }
    const action = this.request.action_str;
    this[action]();
  }
};
