const express = require("express");
const app = express();
const apiRouter = require('./routes/api');
const users = require('./routes/users');
const healthCheck = require("./routes/healthCheck");  
const logger = require('morgan');
const bodyParser = require('body-parser');
const { initializeMongooseConnection } = require('./db/connection');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/apiv1', apiRouter);
app.use('/users',users);
app.use('/',healthCheck);
initializeMongooseConnection();


const port = 3000;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});
