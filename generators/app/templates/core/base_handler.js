const Transconsole = require('./transconsole');
const ACTIONS = require('../config/actions');
const debug = require('debug')('<%= service_name %>:base_handler');

module.exports = class BaseHandler extends Transconsole {
  constructor(request, callback, silent) {
    super(request, silent);
    this._callback = callback;

    if (!this.response.data_type) {
      // TODO(garcianavalon) snake_case this
      this.response.data_type = this.name;
    }
    this.requiredFields = [];
  }

  _getResponseActionString(status) {
    if (!this.request || !this.request.action_str || !ACTIONS[this.request.action_str]) {
      return ACTIONS.error;
    }
    return ACTIONS[this.request.action_str][status];
  }

  success(msg) {
    this.info(msg);
    this.response.action_str = this._getResponseActionString('success');
    this._callback(this.response);
  }

  failure(err) {
    this.error(err);
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
