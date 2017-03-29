const uuidV4 = require('uuid/v4');
const util = require('util');
const debug = require('debug')('transconsole');

function _getTransactionId(transactionMessage) {
  if (transactionMessage && transactionMessage.trans_map && transactionMessage.trans_map.trans_id) {
    return transactionMessage.trans_map.trans_id;
  }
  // Generate a new trans_id
  const transId = uuidV4();
  if (!transactionMessage) {
    debug(`transactionMessage is undefined, skipping`);
    return transId;
  }
  transactionMessage.trans_map = transactionMessage.trans_map || {};
  debug(`Setting transaction id to ${transId} to transactionMessage ${transactionMessage}`);
  transactionMessage.trans_map.trans_id = transId;
  return transId;
}

function _recordLogMessage(transactionMessage, logMessage, logLevel) {
  if (!transactionMessage) {
    return;
  }
  transactionMessage.log_list = transactionMessage.log_list || [];
  transactionMessage.log_list.push({
    log_level: logLevel,
    log_message: logMessage
  });
}

// TODO(garcianavalon) find out how to decorate this stuff
module.exports.log = function (transactionMessage, logMessage, ...otherArgs) {
  // Pre-log operations
  const transId = _getTransactionId(transactionMessage);

  // Delegate to console
  const base = `Transaction ${transId} - ` + logMessage;
  const formatedMessage = util.format(base, ...otherArgs);
  console.log(formatedMessage);

  // Post-log operations
  _recordLogMessage(transactionMessage, logMessage, 'debug');
};

module.exports.info = function (transactionMessage, logMessage, ...otherArgs) {
  // Pre-log operations
  const transId = _getTransactionId(transactionMessage);

  // Delegate to console
  const base = `Transaction ${transId} - ` + logMessage;
  const formatedMessage = util.format(base, ...otherArgs);
  console.info(formatedMessage);

  // Post-log operations
  _recordLogMessage(transactionMessage, logMessage, 'info');
};

module.exports.warn = function (transactionMessage, logMessage, ...otherArgs) {
  // Pre-log operations
  const transId = _getTransactionId(transactionMessage);

  // Delegate to console
  const base = `Transaction ${transId} - ` + logMessage;
  const formatedMessage = util.format(base, ...otherArgs);
  console.warn(formatedMessage);

  // Post-log operations
  _recordLogMessage(transactionMessage, logMessage, 'warn');
};

module.exports.error = function (transactionMessage, logMessage, ...otherArgs) {
  // Pre-log operations
  const transId = _getTransactionId(transactionMessage);

  // Delegate to console
  const base = `Transaction ${transId} - ` + logMessage;
  const formatedMessage = util.format(base, ...otherArgs);
  console.error(formatedMessage);

  // Post-log operations
  _recordLogMessage(transactionMessage, logMessage, 'error');
};

// For testing
module.exports = Object.assign(module.exports, {
  _recordLogMessage: _recordLogMessage,
  _getTransactionId: _getTransactionId
});
