/*
*
* HELPERS FOR VARIOUS TASKS
*
*/

// Dependencies
const crypto = require('crypto');
const config = require('../config');

// Containter for helpers
const helpers = {};

//  Create a SHA526 hash
helpers.hash = function(str){
  if(typeof(str) == 'string' && str.length > 0){
    const hash = crypto.createHmac('sha256',config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
}


// Export the module
module.exports = helpers;