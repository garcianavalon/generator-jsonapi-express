// Stub handler for reference and starting point
const debug = require('debug')('jsonapi:stub');
const utils = require('../utils.js');
const ACTIONS = require('../actions.js');

const create = function(requestMessage, callback){
  return callback({
    'action_str': 'CREATED',
    'data_type': 'stub',
  });
};

const retrieve = function(requestMessage, callback){
  return callback({
    'action_str': 'RETRIEVED',
    'data_type': 'stub',
  });
}

const update = function(requestMessage, callback){
  return callback({
    'action_str': 'UPDATED',
    'data_type': 'stub',
  });
};

const delete = function(requestMessage, callback){
  return callback({
    'action_str': 'DELETED',
    'data_type': 'stub',
  });
};

module.exports.handler = function(requestMessage, callback){
  return callback({
    'action_str': 'DELETED',
    'data_type': 'stub',
  });
};
