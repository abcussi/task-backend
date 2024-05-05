const express = require("express");
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const csurf = require('csurf');
const {
  addCsrfToken
} = require('./middleware/csrfMiddleware'); 
const seed = require('./seed/seed'); 

//global middlewares
const limiter = require("./middleware/limiterMiddleware");


//configurations and middlewares for the app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(limiter);
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "http://localhost:3003"],
    styleSrc: ["'self'", "http://localhost:3003"]
  }
}));

//db connection import and initialization
const { initializeMongooseConnection } = require('./db/connection');

// call seed 
seed();
// Initialize `csurf` middleware
const csrfProtection = csurf({ cookie: true });

// Apply CSRF protection to all routes
app.use(csrfProtection);
app.use(addCsrfToken);

//routes
const healthCheck = require("./routes/healthCheckRoute");  
const users = require('./routes/userRoute');
const tasks = require('./routes/taskRoute');

//db connections
initializeMongooseConnection();

//routes
app.use('/',healthCheck);
app.use('/users',users);
app.use('/tasks', tasks);

//server listening
const port = 3000;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});
