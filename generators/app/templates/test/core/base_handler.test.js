const BaseHandler = require('../../core/base_handler.js');
const ACTIONS = require('../../config/actions');

describe('CRUD handlers', () => {
  test('All action handlers exist', () => {
    const bh = new BaseHandler({}, null, true);
    expect(typeof bh.handle).toBe('function');
    for (let action in ACTIONS) {
      if (!action || action === 'error') {
        continue;
      }
      expect(typeof bh[action]).toBe('function');
    }
  });

  function _testNotImplementedActionHandler(action, done) {
    function cb(response) {
      expect(response.action_str).toBe(ACTIONS[action].failure);
      // Expect(response.log_list.length).toBeGreaterThan(0);
      done();
    }
    const bh = new BaseHandler({action_str: action}, cb, true);
    bh[action]();
  }

  test('create returns a not implemented error', done => {
    _testNotImplementedActionHandler('create', done);
  });

  test('retrieve returns a not implemented error', done => {
    _testNotImplementedActionHandler('retrieve', done);
  });

  test('update returns a not implemented error', done => {
    _testNotImplementedActionHandler('update', done);
  });

  test('delete returns a not implemented error', done => {
    _testNotImplementedActionHandler('delete', done);
  });
});

describe('_notImplemented method', () => {
  test('returns a response object', done => {
    function cb(response) {
      expect(response).toBeDefined();
      done();
    }
    const bh = new BaseHandler({action_str: 'create'}, cb, true);
    bh._notImplemented();
  });
});
