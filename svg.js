module.exports = (graph,callback) =>  {

    var svgfile = "";
    var XMLHttpRequest = require('xhr2');

    var request = new XMLHttpRequest();
    request.open('POST', 'https://provenance.ecs.soton.ac.uk/validator/provapi/documents', true);
    request.setRequestHeader("Content-Type",'application/json;charset=UTF-8');
    request.setRequestHeader("Accept",'image/svg+xml');

    request.onreadystatechange = function (aEvt) {
        if (request.readyState == 4) {
            if(request.status == 200){
                callback(request.responseText);
            }
            else
                console.log("Error api svg");
        }
    };

    request.send(JSON.stringify(graph));
}
