// Tests unitaires projetNodeJs

var chai = require('chai');
var commandParser = require('./commandParser.js');
var processus = require('./processus.js');
var nameVersioning = require('./nameVersioning.js');
var spawn = require('child_process').spawn;
var request = require("request");
var soap = require('soap');
var path = require('path');

var expect = chai.expect; // we are using the "expect" style of Chai
var assert = chai.assert;
var test = {};

// Différents tests pour parser des commandes
describe('Test 1 : commandParsing.js', function() {

  it('gcc hello.c -o hello ', function() {
    var cmdParsed = commandParser("gcc hello.c -o hello").generic();
    expect(cmdParsed).deep.equal({'processName': 'gcc', 'arguments':['hello.c', '-o', 'hello'] });
  });

  it('concat.bat t1.txt t2.txt t3.txt ', function() {
    var cmdParsed = commandParser("concat.bat t1.txt t2.txt t3.txt").generic();
    expect(cmdParsed).deep.equal({'processName': 'concat.bat', 'arguments':['t1.txt','t2.txt','t3.txt'] });
  });

  it('concat.bat (sans arguments)', function() {
    var cmdParsed = commandParser("concat.bat").generic();
    expect(cmdParsed).deep.equal({'processName': 'concat.bat', 'arguments':[] });
  });

  it('Chaine vide ', function() {
    var cmdParsed = commandParser("").generic();
    expect(cmdParsed).deep.equal({'processName': '', 'arguments':[] });
  });
});

// Test d'execution des processus demandés
describe('Test 2 : processus.js', function() {
  /* Si gcc est installé cette commande est censée
  ** renvoyer "ok"
  */
  it('Commande valide : concat.bat t1.txt t2.txt t3.txt', function() {
    processus().generic('concat.bat', ['t1.txt','t2.txt','t3.txt'], function(msg) {
      expect(msg).equal("ok");
    });
  });

  /* Cette commande est censée ne pas s'éxécuter
  ** donc renvoyer "err"
  */ 
  it('Commande invalide : lololol 321', function() {
    processus().generic('lololol', ['321'], function(msg) {
      expect(msg).equal("err");
    });
  });
});

// Test du versioning des fichiers
describe('Test 3 : nameVersioning.js', function() {

  // Test de base
  it('Versioning, 1 fichier', function() {
    var s = nameVersioning("hello.txt").getName();
    expect(s).equal("0-hello.txt");
  });

  // Test de base + On redemande un nom pour le fichier après "modification"
  it('Versioning, 1 fichier créé puis modifié', function() {
    var nameFile = nameVersioning("hello.txt");
    var s = nameFile.getName();
    // On simule une deuxieme demande de nom (pour une deuxieme execution)
    s = nameFile.getName();
    expect(s).equal("1-hello.txt");
  });

});


describe("Test 4 : Lancer le médiateur et ses slaves", function() {

  beforeEach(function(done){
    var dir = path.resolve(process.cwd(), './mediateur');
    options = {'cwd' : dir};
    test.server = spawn("node", ['mediateur.js'], options);
    test.baseUrl = "http://localhost:8000";
    test.slave1 = spawn("node", ['slave1.js'], options);
    test.slaveUrl1 = "http://localhost:8001";
    test.slave2 = spawn("node", ['slave2.js'], options);
    test.slaveUrl2 = "http://localhost:8002";
    done();
  });

  afterEach(function(done){
    test.server.kill();
    test.slave1.kill();
    test.slave2.kill();
    done();
  });

  it("Serveur lancé ?", function(done){
    request(test.baseUrl, function(err, res, body) {
      assert.isOk(!err);
    });

    request(test.slaveUrl1, function(err, res, body) {
      assert.isOk(!err);
    });

    request(test.slaveUrl2, function(err, res, body) {
      assert.isOk(!err);
    });
    done();
  });

  it("Retourne le fichier wsdl ?", function(done){
    request(test.baseUrl + '/mediateurmaitre?wsdl', function(err, res, body){
      assert.isOk(!err);
      assert.equal(res.statusCode, 200);
      assert.isOk(body.length);
      done();
    });
  });

  it("Le service renvoie OK ?", function(done) {
    // On teste directement par rapport au slave 1, qui renvoie toujours YES
    // Car on ne peut pas attendre que l'utilisateur rentre YES manuellement sur le slave (cf code slave2.js)
    soap.createClient(test.slaveUrl1 + '/mediateurslave?wsdl', function(err, client) {
      assert.isOk(!err);
      client.getAnswer({}, function(err, result) {
        assert.isOk(!err);
        expect(result.result).equal("YES");
        done();
      });
    });
  });
});