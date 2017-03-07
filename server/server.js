var express = require('express');
var app = express();
var path = require('path');

const PORT = 3000;

//servo la index.html
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,"..","client","index.html"));
});

var utenti = require('./utenti/utenti.js');
//per tutte le rotte degli utenti vai al file utenti.js
app.use('/utenti',utenti);


//server in ascolto sulla porta 3000
app.listen(PORT,function(){
  console.log('server start at http://localhost:'+PORT);
});
