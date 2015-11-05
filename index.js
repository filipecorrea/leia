var express = require('express');
var app = express();

// Serve the angular client
app.use('/', express.static(__dirname + '/client'));

// Features
// require('./server/authentication/authentication.routes.js')(app);
// require('./server/quotes/quotes.routes.js')(app);

// Start server
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

	console.log('Node server running on port 3000.');
});
