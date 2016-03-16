/** constantes **/
const generic   = 0;
const gcc       = 1;
const java      = 2;


/** dépendances **/

const http            = require('http');
const fs              = require('fs');

const commandParser   = require('./commandParser');
const processus       = require('./processus');
const graphHandler    = require('./graphHandler');
const svgAPI          = require('./svg.js');
const mediatorAPI     = require('./askPermission.js');
    
/** global **/
var process     = processus();
var svg         = null;

var setUsed     = {};
var setActivity = {};
var graph       = {
    "prefix": {
        "default": "http://example.org/"
    },
    "entity": {
    },
    "activity": {
    },
    "agent": {
        "Server": {}
    },
    "used": {
    },
    "wasGeneratedBy": {
    },
    "wasAssociatedWith": {
    }
};
var _graph      = graphHandler(graph);
var port		= 8080;

//setter
function setSVG(value){
    svg = value;
}



// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {

    socket.on('join', function (data) {
      console.log("new client with id:"+data.id);
      socket.join(data.id); 
    });

    socket.on('execCommand', function(data) 
    {

        var cmd = data.command;

        // pré-formatage de la commande
        var parser = commandParser(cmd);

        /////////////////////////////////////////////////
        ///////////////PARSING & EXEC////////////////////
        /////////////////////////////////////////////////
        mediatorAPI(parser,function(v,p)
        {
            var setToWatch = {};
            var cmd = parser.generic();

            if(setActivity[cmd.processName] == undefined) setActivity[cmd.processName] = new nameVersioning(cmd.processName,'');

            setActivity[cmd.processName].version++;
            var porcessName = setActivity[cmd.processName].getName();


            _graph.addActivity(porcessName);
            _graph.addRelation.wasAssociatedWith(porcessName,"Server");
            

            // 1 - fichier qui existe
            for ( var index in cmd.arguments )
            {
                if ( setUsed[cmd.arguments[index]] != undefined){
                    _graph.addRelation.used(porcessName,setUsed[cmd.arguments[index]].getName());
                }else {
                    if(cmd.arguments[index][0] !== '-')
                        setToWatch[cmd.arguments[index]] = true;
                }  
            }

            // 2 - check toWatch
            console.log('\n2 - check set toWatch');
            for ( var fileName in setToWatch )
            {
                

                if (fs.existsSync(fileName)) 
                {

                    setUsed[fileName] = new nameVersioning(fileName,fs.statSync(fileName).ctime.toString().split(' ')[4]);

                    _graph.addEntity(setUsed[fileName].getName());
                    _graph.addRelation.used(porcessName,setUsed[fileName].getName());
                    delete setToWatch[fileName]; 
                    console.log(fileName+' found');

                } else {
                    console.log(fileName+' not found');
                }
            }

            process.generic( cmd.processName , cmd.arguments, function() { 
                
                

                // 3 - check toWatch for output
                console.log('\n3 - check set toWatch for output');
                for ( var fileName in setToWatch )
                {
                

                    if (fs.existsSync(fileName)) 
                    {
                        setUsed[fileName] = new nameVersioning(fileName,fs.statSync(fileName).ctime.toString().split(' ')[4]);
                        _graph.addEntity(setUsed[fileName].getName());
                        _graph.addRelation.wasGeneratedBy(porcessName,setUsed[fileName].getName());
                        console.log(fileName+' .found');
                    } else {
                        delete setToWatch[fileName]; 
                        console.log(fileName+' .not found');
                    }
                }

                // 4 - check toUsed for version
                console.log('\n4 - VERSIONING');
                for ( var fileName in setUsed )
                {
                    var currentLastModif =  fs.statSync(fileName).ctime.toString().split(' ')[4];
                    console.log(fileName+' :'+currentLastModif+" => "+setUsed[fileName].lastModify);

                    if (setUsed[fileName].lastModify != currentLastModif) 
                    {
                        setUsed[fileName].version++;
                        setUsed[fileName].lastModify = currentLastModif;
                        _graph.addEntity(setUsed[fileName].getName());
                        _graph.addRelation.wasGeneratedBy(porcessName,setUsed[fileName].getName());
                    }

                }

                svgAPI(graph,data.id,io);

            });



        });
         
    });

});

server.listen(8080);



/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////


function nameVersioning (fileName,lm)
{
    this.root = fileName;
    this.version = 0;
    this.lastModify = lm;

    this.getName = function ()
    {
        return this.version+'-'+this.root;
    }

}

// TEST de manipulation d'un graph
/*var graph = {
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
        "Activity": {},
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
};*/



/*
var _graph = graphHandler(graph);

_graph.addActivity("a1");
_graph.addEntity("e1");
_graph.addRelation.used("used?3",'e1','a1');

console.log(graph);*/

// exemple de conversion graph->svg
//svgAPI(graph,setSVG);






