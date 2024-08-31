const { MongoClient } = require('mongodb');

async function connectToDB(uri, dbName) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    return { client, db };
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

module.exports = connectToDB;
