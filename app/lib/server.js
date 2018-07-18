/**
 * Server Related Tasks
 */

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const _data = require('./data');
const handlers = require('./handlers');
const helpers = require('./helpers');
const path = require('path');

// =========================  TESTING DATA ==================================

// @TODO move this when done

// testing the twilio helper 
// helpers.sendTwilioSms('4058675309', 'Hello Twilio!', function(err){
//   console.log('this is the twilio err', err);
// })

// Create Test
// _data.create('test','newFile',{'myKey' : 'My value'},function(err){
//   console.log('encountered the following error',err);
// })

// Read Test
// _data.read('test','newFile',function(err,data){
//     console.log('encountered the following error',err, 'Received this data ', data);
//   })

// Update Test
// _data.update('test','newFile',{'newKey' : 'new value'},function(err){
//   console.log('encountered the following error',err);
// })

// Delete Test
// _data.delete('test','newFile',function(err){
//   console.log('encountered the following error',err);
// })

// ========================= END TESTS =========================================


// Instantiate the server module object
const server = {};

// Instantiate the HTTP server
server.httpServer = http.createServer(function(req, res) {
  server.unifiedServer(req,res);
})

// Instantiate the HTTPS server
server.httpsServerOptions = {
  'key' : fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
  'cert' : fs.readFileSync(path.join(__dirname,'/../https/cert.pem'))
}
server.httpsServer = https.createServer(server.httpsServerOptions,function(req, res){
  server.unifiedServer(req,res);
})



// All logic for the http and https server
server.unifiedServer = function(req,res){
  
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP Method
  const method = req.method.toLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // Get the paylod if there is one
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function(data) {
    buffer += decoder.write(data);
  })
  req.on('end', function() {
    buffer += decoder.end();

    // Choose the correct handler to use, if not found use notFound handler
    const chooseHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;

    // Construct data object to send to the handler
    const data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : helpers.parseJsonToObject(buffer)
    }

    // route the request specified in the router
    chooseHandler(data,function(statusCode, payload){
      // Use the status code called back by the handler, or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
      
      // Use the paylod called back by the handler, or default to an empty object
      payload = typeof(payload) == 'object' ? payload : {};

      const payloadString = JSON.stringify(payload);

      // Send the response
      res.setHeader('Content-Type','application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // log the response
      console.log('Returning this response:',statusCode,payloadString);
    })

    // Log the request path
    console.log(`Request recieved on path: ${trimmedPath} with the http method: ${method} with these query string params`,queryStringObject);

    // Log the request headers
    console.log('Request was recieved with these headers:', headers);

    // Log the request payload
    console.log('Request was recieved with this payload:', buffer);
    
  })
}

// Define a request router
server.router = {
  'ping' : handlers.ping,
  'users' : handlers.users,
  'tokens' : handlers.tokens,
  'checks' : handlers.checks
}

// Init script
server.init = function () {
  // Start the http server
  server.httpServer.listen(config.httpPort, function () {
    console.log(`The server is listening on port ${config.httpPort}`);
  })

  // Start the HTTPS server
server.httpsServer.listen(config.httpsPort, function() {
  console.log(`The server is listening on port ${config.httpsPort}`);
})

}


// Export the server
module.exports = server;