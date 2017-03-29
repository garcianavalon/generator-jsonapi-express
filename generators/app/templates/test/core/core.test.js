const assert = require('power-assert');
const paymentsCore = require('../../core/core.js');

describe('core.js', function () {
  // NOTE(garcianavalon) if the stub is imported and works, we can infer the others modules too...

  it('should delegate create messages to correct core module', function (done) {
    const fakeRequest = {
      action_str: 'create',
      data_type: 'stub'
    };
    paymentsCore.processMessage(fakeRequest, function (responseMessage) {
      assert(responseMessage.data_type === 'stub');
      assert(responseMessage.action_str === 'CREATED');
      done();
    });
  });
});
