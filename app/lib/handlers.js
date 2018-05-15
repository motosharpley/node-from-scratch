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

// Not found handler
handlers.notFound = function(data,callback){
  callback(404);
}

// Export Handlers Module
module.exports = handlers;