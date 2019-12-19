var express = require('express');
var router = express.Router();
//O módulo formidable trata o recebimento de arquivos
var formidable = require('formidable');
//Módulo nativo que lida com sistema de arquivos
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/file', (req,res)=>{
  let path = './'+req.query.path;
  if(fs.existsSync(path)){
    fs.readFile(path, (err,data)=>{
      if(err){
        console.error(err);
        res.status(400).json({
          error: err
        });
      }else{
        res.status(200).end(data);
      }
    });
  }else{
    res.status(404).json({
      error: 'File Not Found.'
    });
  }
});

router.delete('/file', (req, res) => {
  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  });
  form.parse(req, (err, fields, files) => {
    let path = "./" + fields.path;
    if(fs.existsSync(path)){
      fs.unlink(path, err=>{
        if(err){
          res.status(400).json({
            err
          });
        }else{
          res.json({
            fields
          });
        }
      });
    }else{
      res.status(404).json({
        error: 'File Not Found.'
      });
    }
  });
});

router.post('/upload', (req, res) => {
  /*Define o diretório de upload e que as
    extensões dos arquivos sejam mantidas*/
  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  });
  form.parse(req, (err, fields, files) => {
    res.json({
      files
    });
  });
});

module.exports = router;
