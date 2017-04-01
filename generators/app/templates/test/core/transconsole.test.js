const Transconsole = require('../../core/transconsole');

function _testLogMethod(method) {
  const message = {
    trans_map: {
      trans_id: 'test-trans-id'
    }
  };
  const mockConsole = jest.fn();
  console[method === 'log' ? 'debug' : method] = mockConsole;

  const ts = new Transconsole(message);
  ts[method]('testing!');

  expect(mockConsole.mock.calls.length).toBe(1);
  expect(mockConsole.mock.calls[0][0]).toBe('Transaction test-trans-id - testing!');
  expect(ts.response.log_list.length).toBe(1);
  expect(ts.response.trans_map.trans_id).toBe('test-trans-id');
}

test('transconsole.log logs correctly', () => {
  _testLogMethod('log');
});

test('transconsole.info logs correctly', () => {
  _testLogMethod('info');
});

test('transconsole.warn logs correctly', () => {
  _testLogMethod('warn');
});

test('transconsole.error logs correctly', () => {
  _testLogMethod('error');
});

test('_getTransactionId extracts trans_id correctly', () => {
  const message = {
    trans_map: {
      trans_id: 'test-trans-id'
    }
  };
  const ts = new Transconsole(message);
  const transId = ts._getTransactionId();
  expect(transId).toBe('test-trans-id');
});

test('_getTransactionId generates new trans_id for messages with no trans_id', () => {
  const ts = new Transconsole({trans_map: {}});
  const transId = ts._getTransactionId();
  expect(transId).toBeDefined();
});

test('_getTransactionId generates new trans_id for messages with no trans_map', () => {
  const ts = new Transconsole({});
  const transId = ts._getTransactionId();
  expect(transId).toBeDefined();
});

test('_getTransactionId generates new trans_id for undefined messages', () => {
  const ts = new Transconsole(undefined);
  const transId = ts._getTransactionId();
  expect(transId).toBeDefined();
});
