/** dépendances **/
const express         = require('express');
const bodyParser      = require('body-parser');
const commandParser   = require('./commandParser');
const processus       = require('./processus');


var app         = express();
var jsonParser  = bodyParser.json();
var process     = processus();



// creation du parser application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// GET
app.get('/', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write('<form method="post" action="/"><input type="text" name="command"><input type="submit" value="exec"></form>');
});

// POST 
app.post('/', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  var cParser = commandParser(req.body.command);
  
  res.send('Nom du processus executée: ' + cParser.getProcessName());

  // exemple d'exec gcc
  process.gcc("prog.c","progCompil");
});

app.listen(8080);


