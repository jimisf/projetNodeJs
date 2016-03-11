var restify = require('restify');

// Server
var server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// rest post http://localhost:8080
server.post('/', function (req, res, next) {

    res.writeHead(202, {'Content-Type': 'application/json; charset=utf-8'});
    res.end();
  return next();
});


server.listen(8081, function () {
  console.log('%s listening at %s', server.name, server.url);
});
