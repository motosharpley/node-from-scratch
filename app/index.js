/*
* Primary file for API
*
*/

// Dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const _data = require('./lib/data');
const handlers = require('./lib/handlers');

// TESTING DATA 
// @TODO delete this when done

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

// ---- END TESTS ----

// Instantiate the HTTP server
const httpServer = http.createServer(function(req, res) {
  unifiedServer(req,res);
})

// Start the server
httpServer.listen(config.httpPort, function() {
  console.log(`The server is listening on port ${config.httpPort}`);
})

// Instantiate the HTTPS server
const httpsServerOptions = {
  'key' : fs.readFileSync('./https/key.pem'),
  'cert' : fs.readFileSync('./https/cert.pem')
}
const httpsServer = https.createServer(httpsServerOptions,function(req, res){
  unifiedServer(req,res);
})

// Start the HTTPS server
httpsServer.listen(config.httpsPort, function() {
  console.log(`The server is listening on port ${config.httpsPort}`);
})

// All logic for the http and https server
const unifiedServer = function(req,res){
  
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP Method
  const method = req.method.toUpperCase();

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
    const chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct data object to send to the handler
    const data = {
      'trimmedPath' : trimmedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
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
const router = {
  'ping' : handlers.ping
}