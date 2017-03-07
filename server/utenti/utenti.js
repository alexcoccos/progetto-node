var express = require('express');
var router = express.Router();
var users = require('./Db.js');

router.get('/',function(req,res){
  res.status(200).json(users);
});

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

//questo deve stare sempre alla fine perchè esporta il modulo all'esterno
module.exports= router;
