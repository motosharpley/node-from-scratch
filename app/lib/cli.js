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

// Input handlers
e.on('man',function(str){
  cli.responders.help();
});

e.on('help',function(str){
  cli.responders.help();
});

e.on('exit',function(str){
  cli.responders.exit();
});

e.on('stats',function(str){
  cli.responders.stats();
});

e.on('list users',function(str){
  cli.responders.listUsers();
});

e.on('more user info',function(str){
  cli.responders.moreUserInfo(str);
});

e.on('list checks',function(str){
  cli.responders.listChecks(str);
});

e.on('more check info',function(str){
  cli.responders.moreCheckInfo(str);
});

e.on('list logs',function(str){
  cli.responders.listLogs();
});

e.on('more log info',function(str){
  cli.responders.moreLogInfo(str);
});

// Responders object
cli.responders = {};

// Help / Man
cli.responders.help = function(){
  console.log('You asked for help');
};

// Exit
cli.responders.exit = function(){
  process.exit(0);
};

// Stats
cli.responders.stats = function(){
  console.log('You asked for stats');
};

// List Users
cli.responders.listUsers = function(){
  console.log('You asked for listUsers');
};

// More User Info
cli.responders.moreUserInfo = function(str){
  console.log('You asked for moreUserInfo',str);
};

// List Checks
cli.responders.listChecks = function(str){
  console.log('You asked for listChecks',str);
};

// More Check Info
cli.responders.moreCheckInfo = function(str){
  console.log('You asked for moreCheckInfo',str);
};

// List logs
cli.responders.listLogs = function(){
  console.log('You asked for listLogs');
};

// More logs Info
cli.responders.moreLogInfo = function(str){
  console.log('You asked for moreLogInfo',str);
};






// Input Processor
cli.processInput = function(str){
  str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
  // Only process the input if the user actually wrote something. Otherwise ignore it.
  if(str){
    // Codify the unique strings that identify the unique questions allowed to be asked
    const uniqueInputs = [
      'man',
      'help',
      'exit',
      'stats',
      'list users',
      'more user info',
      'list checks',
      'more check info',
      'list logs',
      'more log info'
    ];

    // Go through the possible inputs, emit an event when a match is found
    let matchFound = false;
    let counter = 0;
    uniqueInputs.some(function(input){
      if(str.toLowerCase().indexOf(input) > -1){
        matchFound = true;
        // Emit an event matching the unique input, and include the full string given by the user
        e.emit(input,str);
        return true;
      }
    });

    // If no match is found, tell the user to try again
    if(!matchFound){
      console.log(`Command ${str} not found, Please try again`);
    }
  }
}


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

  // Handle each line of input seperately
  _interface.on('line',function(str){
    // Send to the input processor
    cli.processInput(str);

    // Re-initialize the prompt
    _interface.prompt();
  });

  // If the user stops the CLI , kill the associated process
  _interface.on('close',function(){
    process.exit(0);
  });

}



module.exports = cli;