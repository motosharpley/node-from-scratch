/*
*
* REQUEST HANDLERS
*
*/

// Dependencies
const _data = require('./data');
const helpers = require('./helpers.js');

// Define handlers
const handlers = {};

// Ping handler
handlers.ping = function(data,callback){
  callback(200);
}

// Users
handlers.users = function(data,callback){
  const acceptedMethods = ['get','post','put','delete'];
  if(acceptedMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data,callback);
  } else {
    callback(405);
  }
}

// Container for users sub-methods
handlers._users = {};

// Users - GET
handlers._users.get = function(data,callback){

}

// Users - POST
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: none
handlers._users.post = function(data,callback){
  // Check that all required fields are present
  const firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  const lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  const phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  const password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  const tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if(firstName && lastName && phone && password && tosAgreement){
    // Make sure user doesn't already exist
    _data.read('users',phone,function(err,data){
      if(err){
        // Hash the password
        const hashPassword = helpers.hash(password);
      } else {
        callback(400,{'Error' : 'User with that phone number already exists'});
      }
    })
  } else {
    callback(400,{'Error' : 'Missing Required Fields'});
  }
}

// Users - PUT
handlers._users.put = function(data,callback){

}

// Users - DELETE
handlers._users.delete = function(data,callback){

}

// Not found handler
handlers.notFound = function(data,callback){
  callback(404);
}

// Export Handlers Module
module.exports = handlers;