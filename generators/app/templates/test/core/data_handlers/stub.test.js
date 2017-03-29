const assert = require('power-assert');
const sinon = require('sinon');

const stub = require('../../../core/data_handlers/stub.js');

describe('stub.js', function () {
  beforeEach(function () {
    this.sinon = sinon.sandbox.create();
  });

  afterEach(function () {
    this.sinon.restore();
  });

  describe('create', function () {
    const fakeRequest = {
      action_str: 'create',
      data_type: 'stub',
      request_map: {
      }
    };
  });

  describe('retrieve', function () {
    const fakeRequest = {
      action_str: 'retrieve',
      data_type: 'stub',
      request_map: {
      }
    };
  });

  describe('delete', function () {

  });
});
