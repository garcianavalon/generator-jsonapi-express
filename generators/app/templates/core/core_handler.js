const fs = require('fs');
const BaseHandler = require('./base_handler');
const debug = require('debug')('<%= service_name %>:core');

// Get all the data_handlers
const files = fs.readdirSync(`${__dirname.replace('/core', '')}/data_handlers`);
const dataHandlers = {};
for (let file of files) {
  dataHandlers[file.replace('.js', '')] = require(`${__dirname.replace('/core', '')}/data_handlers/${file}`);
}
debug(`Core handlers loaded ${JSON.stringify(dataHandlers)}`);

module.exports = class CoreHandler extends BaseHandler {

  handle() {
    debug(`Core processing message ${JSON.stringify(this.request)}`);
    // TODO(garcianavalon) validate structure
    // http://json-schema.org/implementations.html#validator-javascript

    // NOTE(garcianavalon) quick and simple implementation data_type == handler_module_name
    // A more complex solution may be required in the future
    const Handler = dataHandlers[this.request.data_type];
    if (!Handler) {
      this.failure({
        error: `There is no handler for ${this.request.data_type}`
      });
    }

    debug(`Delegating to handler ${Handler.name}`);
    const handler = new Handler(this.request, this._callback);
    handler.handle();
  }
};
