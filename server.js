/** constantes **/
const generic   = 0;
const gcc       = 1;
const java      = 2;


/** dépendances **/
const express         = require('express');
const bodyParser      = require('body-parser');
const commandParser   = require('./commandParser');
const processus       = require('./processus');
const graphHandler    = require('./graphHandler');
const svgAPI          = require('./svg.js');
    
/** global **/
var app         = express();
var jsonParser  = bodyParser.json();
var process     = processus();
var svg         = null;

//setter
function setSVG(value){
    svg = value;
}

// GET
app.get('/', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write('<form method="post" action="/"><input type="text" name="command"><input type="submit" value="exec"></form>'+svg);
});

// creation du parser application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false })

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


// TEST de manipulation d'un graph
var graph = {
    "prefix": {
        "default": "http://example.org/"
    },
    "entity": {
        "EntityUsed1": {},
        "EntityUsedN": {},
        "EntityGenerated1": {},
        "EntityGeneratedN": {}
    },
    "activity": {
        "Activity": {}
    },
    "agent": {
        "Agent": {}
    },
    "used": {
        "use?0": {
            "prov:activity": "Activity",
            "prov:entity": "EntityUsed1"
        },
        "use?1": {
            "prov:activity": "Activity",
            "prov:entity": "EntityUsedN"
        }
    },
    "wasGeneratedBy": {
        "gen?0": {
            "prov:entity": "EntityGenerated1",
            "prov:activity": "Activity"
        },
        "gen?1": {
            "prov:entity": "EntityGeneratedN",
            "prov:activity": "Activity"
        }
    },
    "wasAssociatedWith": {
        "assoc?0": {
            "prov:activity": "Activity",
            "prov:agent": "Agent"
        }
    }
};



var _graph = graphHandler(graph);

_graph.addActivity("a1");
_graph.addEntity("e1");
_graph.addRelation.used("used?3",'e1','a1');


// exemple de conversion graph->svg
svgAPI(graph,setSVG);








