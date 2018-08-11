/**
 * Test Runner
 */

// Application logic for test runner
_app = {};

// Containers for the tests
_app.tests = {};

// Add the unit tests
_app.tests.unit = require('./unit');

// Count total number of tests to be run
_app.countTests = function(){
  let counter = 0;
  for(let key in _app.tests){
    if(_app.tests.hasOwnProperty(key)){
      let subTests = _app.tests[key];
      for(let testName in subTests){
        if(subTests.hasOwnProperty(testName)){
          counter++;
        }
      }
    }
  }
  return counter;
};

// Run all the tests, collecting the errors and successes
_app.runTests = function(){
  let errors = [];
  let successes = 0;
  let limit = _app.countTests();
  let counter = 0;
  for(let key in _app.tests){
    if(_app.tests.hasOwnProperty(key)){
      let subTests = _app.tests[key];
      for(let testName in subTests){
        if(subTests.hasOwnProperty(testName)){
          (function(){
            let tmpTestName = testName;
            let testValue = subTests[testName];
            // Call the test
            try{
              testValue(function(){
                // If it calls back without throwing, then it passed, log in green
                console.log('\x1b[32m%s\x1b[0m',tmpTestName);
                counter++;
                successes++;
                if(counter == limit){
                  _app.produceTestReport(limit,successes,errors);
                }
              });
            }catch(e){
              // If it throws, then it failed, capture the error thrown and log in red
              errors.push({
                'name' : testName,
                'error' : e
              });
              console.log('\x1b[31m%s\x1b[0m',tmpTestName);
              counter++;
              if(counter == limit){
                _app.produceTestReport(limit,successes,errors);
              }
            }
          })();
        }
      }
    }
  }
};

// Produce test outcome report
_app.produceTestReport = function(limit,successes,errors){
  console.log('');
  console.log('------------BEGIN TEST REPORT------------');
  console.log('');
  console.log('Total Numer of Tests: ',limit);
  console.log('Number of tests Passed: ',successes);
  console.log('Failed Tests: ',errors.length);
  console.log('');

  // If there are errors, print them in detail
  if(errors.length > 0){
    console.log('-------------BEGIN ERROR DETAILS-------------');
    console.log('');
    errors.forEach(function(testError) {
      console.log('\x1b[31m%s\x1b[0m',testError.name);
      console.log(testError.error);
      console.log('');
    });
    console.log('');
    console.log('--------------END ERROR DETAILS--------------');
  }
  console.log('');
  console.log('-------------END TEST REPORT-------------');
};


// Run the tests
_app.runTests();