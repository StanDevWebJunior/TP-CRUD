const database = require('./bdd');
const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const port = 7777;
var bodyParser = require('body-parser');
app.use(bodyParser());

database.test();

app.use(express.static(__dirname + '/Public', {

    extensions: ['html']
}));


app.use(express.json({
    extended: false
}));



 // @@@@@@@@@@@@@ Section Produit @@@@@@@@@@@@@@@@@@@@@@@@
  app.get('/produit', (req, res) => {
  
         database.getProduct(null, (info)=>{
             res.send(info);
         });
  });


app.post('/produit', function (req, res) {


    database.addProduct((err, data) => {
        res.send(data)
    }, req.body)
});



  app.get('/produit/:id', (req, res) => {
  
         database.getProductIds(req.params.id, (info)=>{
             res.send(info[0]);
         });
  });


app.get('/getAll', function(req, res){
    
    database.getAllStocks(null, (info)=>{
        res.send(info)
    });
})

 // @@@@@@@@@@@@@ Section Produit @@@@@@@@@@@@@@@@@@@@@@@@





 // @@@@@@@@@@@@@ Section Marque @@@@@@@@@@@@@@@@@@@@@@@@

 app.get('/marque', (req, res) => {
  
         database.getMarque(null, (info)=>{
             res.send(info);
         });
  });


app.get('/marque/:id', (req, res) => {
  
         database.getMarqueIds(req.params.id, (info)=>{
             res.send(info[0]);
         });
  });


app.post('/marque', function (req, res) {


    database.addMarque((err, data) => {
        res.send(data)
    }, req.body)
});

 // @@@@@@@@@@@@@ Section Marque @@@@@@@@@@@@@@@@@@@@@@@@


app.delete('/produit/:id', function(req, res){
  
    const id = req.params.id
    database.deleteProduct(req.params.id, (info)=>{
             res.send('suppression reussi');
         });
})


app.listen(port, function () {
    console.log(`server waiting @ http:localhost : ${port}`);
});
