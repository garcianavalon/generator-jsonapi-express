const CoreHandler = require('../../core/core_handler.js');

// NOTE(garcianavalon) if it works for stub data_type, we can infer that the
// other data_types work too

test('core delegates create messages to correct handler', done => {
  function cb(response) {
    expect(response.data_type).toBe('stub');
    expect(response.action_str).toBe('CREATED');
    done();
  }
  const request = {
    action_str: 'create',
    data_type: 'stub'
  };
  const core = new CoreHandler(request, cb, true);
  core.handle();
});

describe('data_type errors handling', () => {
  test('create fails if data_type doenst exist', done => {
    function cb(response) {
      expect(response.data_type).toBe('foo');
      expect(response.action_str).toBe('CREATE_FAIL');
      done();
    }
    const request = {
      action_str: 'create',
      data_type: 'foo'
    };
    const core = new CoreHandler(request, cb, true);
    core.handle();
  });
});
