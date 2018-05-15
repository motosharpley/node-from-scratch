/*
*
* REQUEST HANDLERS
*
*/

// Dependencies

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
handlers._users.post = function(data,callback){

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