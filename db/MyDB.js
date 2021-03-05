const { MongoClient } = require("mongodb");

function MyDB() {
  const myDB = {};

  const url = "mongodb://localhost:27017";
  const DB_NAME = "safeTrip";

  myDB.getReports = async (query = {}) => {
    let client;

    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db(DB_NAME);
      const filesCol = db.collection("report");
      const files = await filesCol.find(query).toArray();
      return files;
    } catch (e) {
      console.log("error", e);
    } finally {
      client.close();
    }
  };

  return myDB;
}

module.exports = MyDB();
