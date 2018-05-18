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

// Create a string of random alphanumeric characters of given length
helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
  // Define all the possible characters that can be used
    const possibleChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    
    // Start the final string
    let str = '';
    for(i = 1; i <= strLength; i++){
      // Get a random character from possibleChars string
      let randomChar = possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
      // append this character to the final string
      str+=randomChar;
    }
    // Return the final string
    return str;
    } else {
    return false;
  }
}


// Export the module
module.exports = helpers;