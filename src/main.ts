import "reflect-metadata";
import cors from "cors";
import config from "config";
import express from "express";
import "express-async-errors";
import { MongoClient } from "mongodb";
import { EmployeeRepository } from "@/repositories/employee.repository";
import { EmployeeController } from "@/controllers/employee.controller";
import { errorHandler, notFoundHandler } from "@/middlewares/error-handler.middleware";

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
  
  // repositories
  const employeeRepository = EmployeeRepository.getRepository(mongoDatabase.collection("employees"));
  
  // controllers
  const employeeController = new EmployeeController(employeeRepository);
  
  // controller's routing
  app.use("/employees", employeeController.getRouter());
  
  // error handler
  app.use(notFoundHandler());
  app.use(errorHandler());
  
  // run server
  app.listen(serverPort, "localhost", () => console.log(`Listening on :${serverPort}`));
}

main()
  .catch((err) => console.error(err));