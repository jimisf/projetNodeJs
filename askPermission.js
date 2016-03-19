module.exports = (parser,callback) =>  {

  var soap = require('soap');
  var url = 'http://localhost:8000/mediateurmaitre?wsdl';
  var args = {};
  soap.createClient(url, function(err, client) {
      client.setSecurity(new soap.WSSecurity('root', 'root'))
      client.getAnswer(args, function(err, result) {
          if(result.result === "YES") {
            callback(true, parser);
          }
          else {
            console.log("Le médiateur a renvoyé NO");
          }
      });
  });

}
