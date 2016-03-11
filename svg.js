module.exports = (graph,userID,io) =>  {

    var XMLHttpRequest = require('xhr2');

    var request = new XMLHttpRequest();
    request.open('POST', 'https://provenance.ecs.soton.ac.uk/validator/provapi/documents', true);
    request.setRequestHeader("Content-Type",'application/json');
    request.setRequestHeader("Accept",'image/svg+xml');

    request.onreadystatechange = function (aEvt) {
        if (request.readyState == 4) {
            if(request.status == 200){
                io.sockets.in(userID).emit('newGraph', request.responseText);
            }
        }
    }

    request.send(JSON.stringify(graph));

    
}