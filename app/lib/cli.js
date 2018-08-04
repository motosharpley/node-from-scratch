/**
 * CLI-Related Tasks
 */

//  Dependencies
const readline = require('readline');
const util = require('util');
const debug = util.debuglog('cli');
const events = require('events');
class _events extends events{};
const e = new _events();

// Instantiate the CLI module object
const cli = {};



// Init Script
cli.init = function(){
  // Send the start message to the console, in dark blue
  console.log('\x1b[34m%s\x1b[0m','The CLI is running');

  // Start the interface
  let _interface = readline.createInterface({
    input: process.stdin,
    output : process.stdout,
    prompt : '>'
  });

  // Create an initial prompt
  _interface.prompt();

}



module.exports = cli;