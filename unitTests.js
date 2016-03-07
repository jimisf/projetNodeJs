// Tests unitaires projetNodeJs

var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai


//Test environnements de l'application
describe('Test 1 : Hello world', function() {
  it('Exemple de test', function() {
    var s = "hello";
    expect(s).to.equal("hello");
  });
});

describe('Test 2 : Hello world', function() {
  it('Exemple de test', function() {
    var s = "hello";
    expect(s).to.equal("hello");
  });
});


//Test au niveau du parser

describe('Test 3 : Parser de commande', function() {
  it('Exemple de test', function() {
    var s = "hello";
    expect(s).to.equal("hello");
  });
});