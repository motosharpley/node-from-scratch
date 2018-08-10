/*
* Debug exampl of Primary file for API that will throw 
* To use the node debugger start this file with `node inspect index-debug`
* The file is pre-loaded with debugger statements for the purpose of teaching
* how to step though code with the node debugger
*  stepping commands are 
* cont, c - Continue execution
* next, n - Step next
* step, s - Step in
* out, o - Step out
* pause - Pause running code (like pause button in Developer Tools)
* step in with repl  --- step back out ctrl c
*/

// Dependencies
const server = require('./lib/server');
const workers = require('./lib/workers');
const cli = require('./lib/cli');
const exampleDebugProb = require('./lib/exampleDebugProb');

// Declare the app
const app = {};

// Init function
app.init = function() {
  // Start the server
  debugger;
  server.init();
  debugger;

  // Start the workers
  debugger;
  workers.init();
  debugger;

  // Start the CLI but make sure it starts last
  debugger;
  setTimeout(function(){
    cli.init();
  },50);
  debugger;

  // Set foo to 1
  debugger;
  let foo = 1;
  console.log('assigned 1 to foo');
  debugger;

  // Increment foo
  foo++;
  console.log('incremented foo');
  debugger;

  // square foo
  foo = foo * foo;
  console.log('squared foo');
  debugger;

  // Convert foo to a string
  foo = foo.toString();
  console.log('converted foo to string');
  debugger;

  // Call the init script that will throw
  exampleDebugProb.init();
  console.log('called the library');
  debugger;
};

// Execute
app.init();

// Export the app
module.exports = app;