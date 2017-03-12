const assert = require('power-assert');

describe('app.js', function() {

  it('should start with no errors', function(done){
    const app = require('../app');
    assert(app);
    done();
  });
});
