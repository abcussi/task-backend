const express = require("express");
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const { initializeMongooseConnection } = require('./db/connection');
const cookieParser = require('cookie-parser');
//global middlewares
const limiter = require("./middleware/limiterMiddleware");

//routes
const healthCheck = require("./routes/healthCheckRoute");  
const users = require('./routes/userRoute');
const tasks = require('./routes/tasks');

//configurations and middlewares for the app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(limiter);

//db connections
initializeMongooseConnection();

//routes
app.use('/users',users);
app.use('/',healthCheck);
app.use('/tasks', tasks);

//server listening
const port = 3000;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});
