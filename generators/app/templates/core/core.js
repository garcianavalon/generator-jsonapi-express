const transconsole = require('transaction-console');
const debug = require('debug')('jsonapi:core');

// Get all the files in current dir
const dataHandlers = require('require-dir')('./data_handlers');
debug(`Core handlers loaded ${dataHandlers}`);

// Decide the appropiate handler module
module.exports.processMessage = function(requestMessage, callback){
  debug(`Core processing message ${requestMessage}`);
  const dataType = requestMessage.data_type;
  // NOTE(garcianavalon) quick and simple implementation data_type == handler_module_name
  // A more complex solution may be required in the future
  debug(`Delegating to handler ${dataType}`);

  const handler = new dataHandlers[dataType](requestMessage, callback);
  handler.handle();
}
