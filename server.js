const express = require("express");
const app = express();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
//const csurf = require('csurf');
const cors = require('cors');

const seed = require('./seed/seed'); 

//global middlewares
const limiter = require("./middleware/limiterMiddleware");


//configurations and middlewares for the app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(limiter);

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "http://localhost:3003"],
      scriptSrc: ["'self'", "http://localhost:3003", "'unsafe-inline'"], // Include inline scripts if needed
      styleSrc: ["'self'", "http://localhost:3003", "'unsafe-inline'"], // Include inline styles if needed
      imgSrc: ["'self'", "http://localhost:3003"], // Allow images from localhost
      connectSrc: ["'self'", "http://localhost:3003"], // Allow XHR and WebSocket connections
    },
  })
);
app.use(cors({
  origin: 'http://localhost:3003', // Permite este origen específico
  credentials: true, // Permite el envío de credenciales
}));

//db connection import and initialization
const { initializeMongooseConnection } = require('./db/connection');

// call seed 
seed();
// Initialize `csurf` middleware
//const csrfProtection = csurf({ cookie: false });

// Apply CSRF protection to all routes
//app.use(csrfProtection);

//routes
const healthCheck = require("./routes/healthCheckRoute");  
const users = require('./routes/userRoute');
const tasks = require('./routes/taskRoute');
const status = require('./routes/statusRoute');

//db connections
initializeMongooseConnection();

//routes
app.use('/',healthCheck);
app.use('/users',users);
app.use('/tasks', tasks);
app.use('/status', status);

//server listening
const port = 3000;
const server = app.listen(port, function () {
  console.log("Server listening on port " + port);
});
