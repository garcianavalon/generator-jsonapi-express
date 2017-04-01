const uuidV4 = require('uuid/v4');
const util = require('util');
const debug = require('debug')('transconsole');

// NOTE(garcianavalon) dirty hack for convenience
console.debug = console.log;

module.exports = class Transconsole {

  constructor(requestMessage, silent) {
    this.silent = silent;

    this.request = requestMessage || {};
    this.response = {
      log_list: []
    };
    // Store full transaction object
    this.response.trans_map = this.request.trans_map || {};
  }

  _getTransactionId() {
    this.response.trans_map = this.response.trans_map || {};

    if (this.response.trans_map.trans_id) {
      return this.response.trans_map.trans_id;
    }

    // Generate a new trans_id
    const transId = uuidV4();
    debug(`Setting transaction id to ${transId} to message ${this.response}`);
    this.response.trans_map.trans_id = transId;
    return transId;
  }

  _logMessage(logMessage, logLevel, ...otherArgs) {
    // Pre-log operations
    const transId = this._getTransactionId();

    // Delegate to console
    if (!this.silent) {
      const base = `Transaction ${transId} - ` + logMessage;
      const formatedMessage = util.format(base, ...otherArgs);
      console[logLevel](formatedMessage);
    }

    // Post-log operations
    this.response.log_list = this.response.log_list || [];
    this.response.log_list.push({
      log_level: logLevel,
      log_message: logMessage
    });
  }

  log(logMessage, ...otherArgs) {
    this._logMessage(logMessage, 'debug', ...otherArgs);
  }

  info(logMessage, ...otherArgs) {
    this._logMessage(logMessage, 'info', ...otherArgs);
  }

  warn(logMessage, ...otherArgs) {
    this._logMessage(logMessage, 'warn', ...otherArgs);
  }

  error(logMessage, ...otherArgs) {
    this._logMessage(logMessage, 'error', ...otherArgs);
  }

};
