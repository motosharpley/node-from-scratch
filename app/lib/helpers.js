/*
*
* HELPERS FOR VARIOUS TASKS
*
*/

// Dependencies
const crypto = require('crypto');
const config = require('./config');

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

// Parse a JSON string to an object in all cases, without throwing
helpers.parseJsonToObject = function(str){
  try{
    const obj = JSON.parse(str);
    return obj;
  }catch(e){
    return {};
  }
}


// Export the module
module.exports = helpers;