module.exports = (parser,callback) =>  {

    var XMLHttpRequest = require('xhr2');

    var request = new XMLHttpRequest();

    request.open('POST', 'http://localhost:8081', true);
    request.setRequestHeader("Content-Type",'application/json;charset=UTF-8');

    request.onreadystatechange = function (aEvt) {
        if (request.readyState == 4) {
            if(request.status == 202){
                callback(true,parser);
            }
            else
                console.log("Error");
        }
    };

    request.send();
}
