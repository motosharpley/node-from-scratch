/*
* Primary file for API
*
*/

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all requests with a string
const server = http.createServer(function(req, res) {
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
})

// Start the server, and listen on PORT 3000
server.listen(3000, function() {
  console.log('The server is listening on port 3000');
})

// Define handlers
const handlers = {};

// example handler
handlers.example = function(data,callback){
  // callback http status code and a payload object
  callback(406,{'name' : 'example handler'});
}

// Not found handler
handlers.notFound = function(data,callback){
  callback(404);
}

// Define a request router
const router = {
  'example' : handlers.example
}