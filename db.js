require('dotenv').config();

const password = process.env.DB_PASSWORD;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${password}@cluster0.kqn0ikw.mongodb.net/?retryWrites=true&w=majority`;
const dbClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1, maxPoolSize: 10 });


const initDBClient = async () => {
  // Use connect method to connect to the server
  await dbClient.connect();
  console.log('Connected successfully to DB server');
  const db = dbClient.db('calendar_api_db');
  return db;
}

module.exports = { initDBClient };