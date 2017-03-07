var express = require('express');
var router = express.Router();
var users = require('./Db.json');
var jsonfile = require('jsonfile');// serve per scrive sul file
var path = require('path');

//carica lista utenti dall db alla pagina
router.get('/',function(req,res){
  res.status(200).json(users);
});
//ricerca per id
router.get('/id/:id',function(req,res)//il primo id è la rotta principale
{
  var id = req.params.id;
  //var user = undefined;
  for(let i =0; i<users.length; i++)
  {
    if(users[i].id == id)
    {
      var user = {};
      user = users[i];
    }
  }
//var user = listaUtenti.find(function(el){return el.id==id;}); // stesso procedimento di spora ma nn serv mank o cazz kist
  if(user)
  {
    res.status(200).json(user);

  }else {
    res.status(404).send("utente non trovato");
  }
});
//ricerca per sesso uguale si può fare con le donne
router.get('/sesso',function(req,res){
  var sesso = req.query.sesso;
  lista=[];
  for(let i =0; i<users.length; i++)
  {
    if(users[i].sesso == 'Male')
    {
      lista.push(users[i]);
    }
  }
  if(lista.length)
  {
    res.status(200).json(lista);
  }
  else {
    res.status(404).send("non ci sono utenti maschi");
  }
});
//ricerca per nome
router.get('/nome',function(req,res){
  var nome = req.query.nome;
  lista=[];
  for(let i =0; i<users.length; i++)
  {
    if(users[i].nome == nome)
    {
      lista.push(users[i]);
    }
  }
  if(lista.length)
  {
    res.status(200).json(lista);
  }
  else {
    res.status(404).send("non ci sono utenti con questo nome");
  }
});
// ricerca per cognome
router.get('/cognome',function(req,res){
  var cognome = req.query.cognome;
  lista=[];
  for(let i =0; i<users.length; i++)
  {
    if(users[i].cognome == cognome)
    {
      lista.push(users[i]);
    }
  }
  if(lista.length)
  {
    res.status(200).json(lista);
  }
  else {
    res.status(404).send("non ci sono utenti con questo cognome");
  }
});
//cancellazione dalla lista
router.delete('/id/:id',function(req,res){
  var id = req.params.id;
  for(let i=0; i<users.length; i++)
  {
    if(users[i].id == id)
    {
      user = users[i];
    }
  }
  if(user)
  {
    users.splice(users.indexOf(user),1);//elimina un elemento
    res.json(users);
    //riscrive il file del db senza l'utente cancellato
    jsonfile.writeFile(path.join(__dirname,"Db.json"),users,function(err)
    {
      console.log(err);
    });
  }
  else
  {
    res.status(404).send("utente inesistente");
  }
});
//inserisci nuovo utente
router.post('/',function(req,res){
  var nuovo = req.body;
  var cont = 0;
  for(let i=0;i<=users.length;i++)
  {
    cont+=1;
  }
  nuovo.id= cont+1;
  users.push(nuovo);
  jsonfile.writeFile(path.join(__dirname, "Db.json"), users, function (err)
  {
    console.log(err);
  });
})

//questo deve stare sempre alla fine perchè esporta il modulo all'esterno
module.exports= router;
