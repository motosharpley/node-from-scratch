/**
 * API Tests
 */

//  Dependencies
const app = require('./../index');
const assert = require('assert');
const http = require('http');
const config = require('./../lib/config');

// Container for tests
const api = {};

// Helpers
const helpers = {};
helpers.makeGetRequest = function(path,callback){
  // Configure the request details
  let requestDetails = {
    'protocol' : 'http',
    'hostname' : 'localhost',
    'port' : config.httpPort,
    'method' : 'GET',
    'path' : path,
    'headers' : {
      'Content-Type' : 'application/json'
    }
  };
  // Send the request
  let req = http.request(requestDetails,function(res){
    callback(res);
  });
  req.end();
};



// Export tests to the runner
module.exports = api;