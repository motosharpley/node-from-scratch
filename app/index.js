/*
* Primary file for API
*
*/

// Dependencies
const server = require('./lib/server');
const workers = require('./lib/workers');
const cli = require('./lib/cli');

// Declare the app
const app = {};

// Init function
app.init = function(callback) {
  // Start the server
  server.init();

  // Start the workers
  workers.init();

  // Start the CLI but make sure it starts last
  setTimeout(function(){
    cli.init();
    callback();
  },50);
}

// Execute
app.init();

// Export the app
module.exports = app;