var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extend:true}));
console.log(path.resolve(__dirname));


var city = ['İstanbul', 'Ankara', 'Hatay'];

app.get('/', function (req, res) {

    res.render('home');
});

app.get('/sehirler', function (req, res) {
    res.render('city', {sehirler:city});
});

app.post('/newCity', function (req, res) {
    var newcity = req.body.newcity;
    city.push(newcity);
    res.redirect('/sehirler');
});

app.get("*", function (req, res) {
    res.send("<h1>  Sayfa Bulunamadı </h1>")
});

var server = app.listen(3000, function () {
    console.log("Şuan Server Portu : %d", server.address().port);
});
