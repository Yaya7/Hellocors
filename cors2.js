var express = require('express');  
var request = require('request');

var app = express();
var gg = false;
var gg2 = false;
app.use('/', function(req, res, next) {
	var url = req.url.substr(1);
	req.headers = {};
	req.headers['Host'] = "nba.com";
	req.header['Cache-Control'] = 'no-cache';
	req.header['User-Agent'] = 'iPad\r\n';
	req.header['Accept'] = '*/*';
	req.header['Accept-Encoding'] = 'gzip, deflate, sdch, br';
	req.header['Accept-Language'] = 'en-US,en;q=0.8';
	res.header('access-control-allow-origin', '*');
	// console.log(url);
	var proxy = request(url);
	proxy.on('data', function(data) {
		gg = data;
		gg2 = url;
		console.log('Proxy data: url: ' + url + "\n" + data); 
	});
	req.pipe(proxy);
	proxy.pipe(res);
});

app.listen(process.env.PORT || 80); 


