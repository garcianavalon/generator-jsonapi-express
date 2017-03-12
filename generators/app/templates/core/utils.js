const debug = require('debug')('jsonapi:core');
const ACTIONS = require('./actions.js');

const BASE_RESPONSE = {
  'log_list' :[
  ],
};

function _addLogRecord(response, user_msg) {
  return response.log_list.push({
    'code_key'  : "400", // TODO(garcianavalon) decide and document this
    'code_str'  : "Bad request",
    'level_int' : 3,
    'level_str' : "error",
    'log_id'    : "1096", // TODO(garcianavalon) figure out this
    'user_msg': user_msg,
  });
}

// TODO(garcianavalon) this method should be async and accept a callback too
module.exports.validateRequestData = function(requestMessage, requiredFields) {
  const requestData = requestMessage.request_map;
  for (let field of requiredFields){
    if (field in requestData) {
      continue;
    }
    debug(`${field} missing in request_map for request ${requestMessage}`);
    const badRequestResponse = JSON.parse(JSON.stringify(BASE_RESPONSE));
    badRequestResponse.action_str = ACTIONS[requestMessage.action_str].failure;
    badRequestResponse.data_type = requestMessage.data_type;
    _addLogRecord(badRequestResponse, `${field} required in request_map`);
    return badRequestResponse;
  }
  return;
}
