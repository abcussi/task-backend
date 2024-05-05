require('dotenv').config(); // Load environment variables

const dbConfig = {
  username: encodeURIComponent(process.env.MONGO_INITDB_ROOT_USERNAME),
  password: encodeURIComponent(process.env.MONGO_INITDB_ROOT_PASSWORD),
  host: process.env.MONGO_INITDB_HOST || 'localhost',
  port: process.env.MONGO_INITDB_PORT || 27017,
  database: process.env.MONGO_INITDB_DATABASE || '', // Set the database name here if required
  options: {
    autoIndex: false,
    authSource: 'admin'
  }
};

// Construct the connection string
const connectionString = `mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;

module.exports = { connectionString, options: dbConfig.options };