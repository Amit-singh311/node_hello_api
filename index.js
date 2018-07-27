/*
* Primary file for Node Hello APi
 */

//Dependencies
const http          = require('http');
const url           = require('url');
const stringDecoder = require('string_decoder').StringDecoder;

//Instance of the http server
 const server =  http.createServer( (req, res) => {
 	//get the url and parse it
 	const parseUrl = url.parse(req.url,true);
 	//get the path
 	const path = parseUrl.pathname;
 	//getting the trimmed path
 	const trimmedPath = path.replace(/^\/+|\/+$/g,'');
 	const method = req.method.toLowerCase();
 	//getting the header and sending as object
 	const headers = req.headers;

 	//getting the payload if any
 	const decoder = new stringDecoder('utf-8');
 	var buffer = '';
 	req.on('data', (data) => {
 		buffer += decoder.write(data);
 	});

 	req.on('end', () => {
 		buffer += decoder.end();
 		console.log('checking for the buffer ', buffer );
        //choosing the right router
 		let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] :handlers.notfound;

 		chosenHandler( (statuscode, payload) => {
 			//setting up the default status code
 			statuscode = typeof(statuscode) == 'number' ? statuscode : 200;

 			//setting up the default payload
 			payload = typeof(payload) == 'object' ? payload : {};

 			let payloadString = JSON.stringify(payload);

 				//send the response
 				res.setHeader('Content-Type', 'application/json');
 				res.writeHead(statuscode);
 			    res.end(payloadString);
 			    
 			    console.log('Returning this response', statuscode,payloadString);


 		});
 	});
 	
    console.log('hello world');
 });

 //Start the httpserver
 server.listen(3000 , () => {
 	console.log('The server is listening on port 3000 now');
 });

 const handlers = {};
 handlers.hello = (callback) => {
  //callback a status code   
    callback(200, {'message' : 'hello der!!'});
 };

 handlers.notfound = (callback) => {
   //callback for data not found
    callback(404);
 };

 //Define a router
 const router = {
 	'hello' : handlers.hello
 };