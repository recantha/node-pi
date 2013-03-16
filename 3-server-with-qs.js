var http = require('http');

http.createServer(function(req,res) {
	// get http query header
	var query = require('url').parse(req.url).query;

	// get url parameters out of the query string
	var url_param = require('querystring').parse(query).param;

	var currentTime = new Date();
	console.log('Server was hit at '+currentTime);

	res.writeHead(200, {'Content-Type':'text/html'});

	res.write('Hello! You passed in parameter ' + url_param);

	res.end();
}).listen('8124');
