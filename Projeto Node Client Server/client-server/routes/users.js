var express = require('express');
var assert = require('assert');
var restify = require('restify-clients');
var router = express.Router();

/* Especifica o servidor que enviará os dados
   da API.
*/
var client = restify.createJsonClient({
  url: "http://localhost:4000"
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  //Chama a rota /users do servidor
  client.get('/users',function(err,request,response,obj){
    assert.ifError(err);
    res.json(obj);
  });
});

router.get('/:id', function(req, res, next) {
  //Chama a rota /users enviando os dados do usuário
  client.get(`/users/${req.params.id}`,function(err,request,response,obj){
    assert.ifError(err);
    res.json(obj);
  });
});

router.put('/:id', function(req, res, next) {
  //Chama a rota /users enviando os dados do usuário
  client.put(`/users/${req.params.id}`,req.body,function(err,request,response,obj){
    assert.ifError(err);
    res.json(obj);
  });
});

router.delete('/:id', function(req, res, next) {
  //A API restify invoca o método delete usando o método del
  client.del(`/users/${req.params.id}`,function(err,request,response,obj){
    assert.ifError(err);
    res.end(JSON.stringify(obj,null,2));
  });
});

router.post('/', function(req, res, next) {
  //Envia os dados do usuário
  client.post('/users',req.body,function(err,request,response,obj){
    assert.ifError(err);
    res.end(JSON.stringify(obj,null,2));
  });
});


module.exports = router;
