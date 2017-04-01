const Stub = require('../../../core/data_handlers/stub.js');

function _testHandlerForAction(action) {
  function cb(response) {
    expect(response).toBeDefined();
  }
  const stub = new Stub({action_str: action}, cb, true);
  stub.handle();
}

describe('create', () => {
  test('create succeded', () => {
    _testHandlerForAction('create');
  });
});

describe('retrieve', () => {
  test('retrieve', () => {
    _testHandlerForAction('retrieve');
  });
});

describe('update', () => {
  test('update', () => {
    _testHandlerForAction('update');
  });
});

describe('delete', () => {
  test('delete', () => {
    _testHandlerForAction('delete');
  });
});
