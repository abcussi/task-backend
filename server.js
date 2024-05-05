const express = require("express");
const app = express();
const users = require('./routes/userRoute');
const healthCheck = require("./routes/healthCheckRoute");  
const logger = require('morgan');
const bodyParser = require('body-parser');
const { initializeMongooseConnection } = require('./db/connection');
const cookieParser = require('cookie-parser');
const limiter = require("./middleware/limiterMiddelware");

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(limiter);

initializeMongooseConnection();


app.use('/users',users);
app.use('/',healthCheck);


const port = 3000;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});
