const express = require('express');
const app = express();



app.get('/', function(req, res){
    res.json("Hello World");
   });

const port = 3000;

const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});