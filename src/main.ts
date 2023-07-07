import "reflect-metadata";
import cors from "cors";
import config from "config";
import express from "express";
import { MongoClient } from "mongodb";

async function main() {
  // get config
  const mongoHost = config.has("mongo.host") ? config.get<string>("mongo.host") : "127.0.0.1";
  const mongoPort = config.has("mongo.port") ? config.get<number>("mongo.port") : 5432;
  const mongoDatabaseName = config.get<string>("mongo.database");
  
  const serverPort = config.get<number>("server.port") ?? 80;
  
  // create connection to mongo
  const mongoUrl = `mongodb://${mongoHost}:${mongoPort}`;
  const mongoClient = new MongoClient(mongoUrl);
  await mongoClient.connect();
  console.log(`Connected to ${mongoUrl}`);
  
  // close mongo connection when application exit
  process.on("exit", async () => await mongoClient.close());
  
  // get mongo database
  const mongoDatabase = mongoClient.db(mongoDatabaseName);
  
  // create express app
  const app = express();
  
  // register middleware to express app
  app.use(express.json());
  app.use(cors());
  
  // controllers
  
  
  // controller's routing
  
  
  // run server
  app.listen(serverPort, "localhost", () => console.log(`Listening on :${serverPort}`));
}

main()
  .catch((err) => console.error(err));