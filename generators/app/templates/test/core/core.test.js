const core = require('../../core/core.js');

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
  core.processMessage(request, cb);
});
