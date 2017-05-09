var express = require('express');
var app = express();

// app.use(express.static('./dist'));

app.post('/ajax', function (req, res) {
    // var response = require('./data/cart');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // res.send(response);
});

app.listen(3000, function () {
    console.log('Example app listening on port http://localhost:3000');
});
