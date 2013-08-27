var http = require("http");
var log = require("./log");
var fs = require('fs');
var url = require("url");
path = require('path');
var commands = require('./commands');
var uptime = 0;

function start(debug, port) {
	log.log("Server has started.");
  function onRequest(request, response) {
		var file = null;
		try {
			file = path.normalize(decodeURI(url.parse(request.url).pathname));
		} catch (e) {
		}
		if (file.substring(file.length-1) == "\\"){
			file = file + "index.html";
		}
		file = "www"+file
		if(debug == 1){
			log.log("Request for " + file.substring(4) + " received.");
		}
		fs.exists(file, function(exists) {
		  if (exists) {
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write("Hello World");
			response.end();
		  } else {
			response.writeHead(404, {"Content-Type": "text/html"});
			response.write("Error 404: File not Found");
			response.end();
		  }
		});
	}
	
	http.createServer(onRequest).listen(port);
	log.log("Started Listening");
	commands.listen();
	if(debug == 1){
		setInterval(function(){uptime++;}, 36000000);
		setInterval(function(){log.log("Uptime (Hours): "+uptime);}, 36000000);
	}
}

exports.start = start;