var express = require('express');
var app = express();


app.set('view engine', 'ejs');
app.use(express.static('public'))
app.get('/', function (req, res) {
    res.render('home');
});





var server = app.listen(3000, function () {
    console.log('Uyguluma Başladı Port : %d', server.address().port);

});