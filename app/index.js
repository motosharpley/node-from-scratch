/*
* Primary file for API
*
*/

// Dependencies
const http = require('http');
const url = require('url');

// The server should respond to all requests with a string
const server = http.createServer(function(req,res) {
    
    // Get the URL and parse it 
    const parsedUrl = url.parse(req.url,true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the HTTP Method
    const method = req.method.toUpperCase();
    
    // Send the response
    res.end('Hello Node\n');

    // Log the request path
    console.log(`Request recieved on path: ${trimmedPath} with the http method: ${method} with these query string params`, queryStringObject);
    
})

// Start the server, and listen on PORT 3000
server.listen(3000,function(){
    console.log("The server is listening on port 3000")
})