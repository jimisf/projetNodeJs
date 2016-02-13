/** constantes **/
const generic   = 0;
const gcc       = 1;
const java      = 2;


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

  // formulaire vide
  if (!req.body) return res.sendStatus(400);

  // pré-formatage de la commande
  var parser = commandParser(req.body.command);
  
  // on détermine quel processus doit être executé
  var processId =  parser.getProcessId();

  // analyse et execution de la commande
  switch (processId)
  {
  	case gcc :

  		try {
  	 		var cmd = parser.gcc();
  	 		process.gcc( cmd.fileIn , cmd.fileOut );
  	 	} 
  	 	catch (e)
  	 	{
  	 		console.log(e);
  	 	}
  	break;

  	case java :
  	break;

    case generic :
      var cmd = parser.generic();
      process.generic( cmd.processName , cmd.arguments );

  }

});

app.listen(8080);


