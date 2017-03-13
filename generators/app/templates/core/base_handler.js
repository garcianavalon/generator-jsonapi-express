const transconsole = require('transaction-console');
const debug = require('debug')('jsonapi:stub');
const ACTIONS = require('../actions.js');

module.exports = class BaseHandler {
  constructor(requestMessage, callback) {
    this.requestMessage = requestMessage;
    this.callback = callback;
  };

  // TODO(garcianavalon) this method should be async and accept a callback too
  validateRequestData (requiredFields) {
    const requestData = this.requestMessage.request_map;
    for (let field of requiredFields){
      if (field in requestData) {
        continue;
      }
      debug(`${field} missing in request_map for request ${this.requestMessage}`);
      const badRequestResponse = {};
      badRequestResponse.action_str = ACTIONS[this.requestMessage.action_str].failure;
      badRequestResponse.data_type = this.requestMessage.data_type;
      this.error(badRequestResponse, `${field} required in request_map`);
      return badRequestResponse;
    }
    return;
  }

  _notImplemented() {
    const serverErrorResponse = {};
    serverErrorResponse.action_str = ACTIONS[this.requestMessage.action_str].failure;
    serverErrorResponse.data_type = this.requestMessage.data_type;
    this.error(badRequestResponse, `${this.requestMessage.action} handler not implemented for data_type ${this.dataType}`);
    this.callback(badRequestResponse);
  };

  log() {

  };

  info() {

  };

  warn() {

  };

  error() {

  };

  create(){
    this._notImplemented();
  };

  retrieve(){
    this._notImplemented();
  }

  update(){
    this._notImplemented();
  };

  delete(){
    this._notImplemented();
  };

  handle(){
    const action = this.requestMessage.action_str;

    // Validate required params
    const errorResponse = this.validateRequestData(this.requiredParams[action]);
    if(errorResponse){
      return this.callback(errorResponse);
    }

    const responseMessage = {
      'data_type': this.dataType,
      'log_list': [],
    };

    // store full transaction object
    this.responseMessage = Object.assign(responseMessage, this.requestMessage.trans_map);

    return this[action]();
  };
}
