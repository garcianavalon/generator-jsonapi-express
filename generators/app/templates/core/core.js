const debug = require('debug')('jsonapi:core');

// Get all the files in current dir
const dataHandlers = require('require-dir')('./data_handlers');
debug(`Core handlers loaded ${dataHandlers}`);

// Decide the appropiate handler module
module.exports.processMessage = function(requestMessage, callback){
  debug(`Core processing message ${requestMessage}`);
  const dataType = requestMessage.data_type;
  const action = requestMessage.action_str;

  // NOTE(garcianavalon) quick and simple implementation data_type == handler_module_name
  // A more complex solution may be required in the future
  debug(`Delegating to handler ${dataType}`);
  // NOTE(garcianavalon) its better to delegate the action part to the handler,
  // so more auto-magic can be done with params validation through a map rather than
  // imperatively at the start of each method
  dataHandlers[dataType].handler(requestMessage, function(responseMessage){
    callback(responseMessage);
  });
}
