var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('lodash');

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//var jsonData = { count: 12, message: 'hey'};

var lions = [];

var id = 0;

/*
app.get('/', function(req,res){

    res.sendFile(__dirname+ '/index.html', function(err){
        if(err){
           res.status(500).send(err);
        }
    })
});


app.get('/data', function(req,res){
    res.json(jsonData);
});
*/

app.get('/lions', function(req,res){
    res.json(lions);
});

app.get('/lions/:id', function(req,res){
    var id = req.params.id;
    var lion = _.find(lions, {id: req.params.id});
    res.json(lion || {});
});

app.post('/lions', function(req,res){
    var lion = req.body;
    id++;
    lion.id = id + '';
    lions.push(lion);
    res.json(lion);
});

app.delete('lions/:id', function(req,res){
    var id = req.params.id;
    var lion = _.findIndex(lions, {id: req.params.id});
    if(!lions[lion]){
            res.send();
    }else {
        lions.splice(lion, 1);
    }
});

app.listen(3000, function(req,res){
    console.log('Server is listening on port 3000');
});


