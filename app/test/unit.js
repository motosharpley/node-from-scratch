/**
 * Unit Tests
 */

//  Dependencies
const helpers = require('./../lib/helpers');
const assert = require('assert');
const logs = require('./../lib/logs');
const exampleDebugProb = require('./../lib/exampleDebugProb');

// Container for the tests
const unit = {};

// Assert that getNumber function is returning a number
unit['helpers.getNumber should return a number'] = function(done){
  let val = helpers.getNumber();
  assert.equal(typeof(val),'number');
  done();
};

// Assert that getNumber function is returning number 33
unit['helpers.getNumber should return 33'] = function(done){
  let val = helpers.getNumber();
  assert.equal(val,33);
  done();
};

// Assert that getNumber function is returning number 69(this test should fail)
unit['helpers.getNumber should return 69'] = function(done){
  let val = helpers.getNumber();
  assert.equal(val,69);
  done();
};

// Logs.list should callback an array and error = false
unit['logs.list should callback false error and array of log names'] = function(done){
  logs.list(true,function(err,logFileNames){
    assert.equal(err,false);
    assert.ok(logFileNames instanceof Array);
    assert.ok(logFileNames.length > 1);
    done();
  });
};

// Logs.truncate should not throw if the logId does not exist
unit['logs.truncate should not throw if the logId does not exist it should callback and error'] = function(done){
  assert.doesNotThrow(function(){
    logs.truncate('non existent id',function(err){
      assert.ok(err);
      done();
    });
  },TypeError);
};

// exampleDebugProb.init should not throw(but it does for the purpose of this example)
unit['exampleDebugProb.init should not throw when called'] = function(done){
  assert.doesNotThrow(function(){
    exampleDebugProb.init();
      done();
  },TypeError);
};

module.exports = unit;