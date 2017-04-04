// Const transconsole = require('../transaction-console/transaction-console');
const debug = require('debug')('jsonapi:core');
const fs = require('fs');

// Get all the data_handlers
const files = fs.readdirSync(`${__dirname}/data_handlers`);
const dataHandlers = {};
for (let file of files) {
  dataHandlers[file.replace('.js', '')] = require(`${__dirname}/data_handlers/${file}`);
}
debug(`Core handlers loaded ${JSON.stringify(dataHandlers)}`);

// Decide the appropiate handler module
module.exports.processMessage = function (request, callback) {
  debug(`Core processing message ${JSON.stringify(request)}`);
  const dataType = request.data_type;
  // NOTE(garcianavalon) quick and simple implementation data_type == handler_module_name
  // A more complex solution may be required in the future
  const Handler = dataHandlers[dataType];
  if (!Handler) {
    // TODO(garcianavalon) better error handling
    return callback({
      error: `There is no handler for ${dataType}`
    });
  }
  debug(`Delegating to handler ${Handler.name}`);
  const handler = new Handler(request, callback);
  handler.handle();
};
