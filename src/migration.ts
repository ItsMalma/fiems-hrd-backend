import config from "config";
import { MongoClient } from "mongodb";

async function migration() {
  // get config
  const mongoHost = config.has("mongo.host") ? config.get<string>("mongo.host") : "127.0.0.1";
  const mongoPort = config.has("mongo.port") ? config.get<number>("mongo.port") : 27017;
  const mongoDatabaseName = config.get<string>("mongo.database");
  
  // create connection to mongo
  const mongoUrl = `mongodb://${mongoHost}:${mongoPort}`;
  const mongoClient = new MongoClient(mongoUrl);
  await mongoClient.connect();
  console.log(`Connected to ${mongoUrl}`);
  
  // close mongo connection when application exit
  process.on("exit", async () => await mongoClient.close());
  
  // get mongo database
  const mongoDatabase = mongoClient.db(mongoDatabaseName);
  
  // migration for employee (create indexes)
  const employeesCollection = await mongoDatabase.collection("employees");
  await employeesCollection.createIndexes([
    {name: "unique_nik_employee", key: {"detail.nik": 1}, unique: true},
    {name: "unique_npwp_employee", key: {"detail.npwp": 1}, unique: true, sparse: true},
    {name: "unique_phoneNumber_employee", key: {"detail.phoneNumber": 1}, unique: true},
    {name: "unique_email_employee", key: {"detail.email": 1}, unique: true},
  ]);
}

migration()
  .then(() => {
    console.log("migration finished");
    process.exit(0);
  });