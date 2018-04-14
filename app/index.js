/*
* Primary file for API
*
*/

// Dependencies
const http = require('http');
const url = require('url');

// The server should respond to all requests with a string
const server = http.createServer(function(req, res) {
    
    // Get the URL and parse it 

    // Get the path
    
    // Send the response
    res.end('Hello Node\n');

    // Log the request path
    
})

// Start the server, and listen on PORT 3000
server.listen(3000,function(){
    console.log("The server is listening on port 3000")
})