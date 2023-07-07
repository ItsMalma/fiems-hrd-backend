import "reflect-metadata";
import cors from "cors";
import config from "config";
import express from "express";

async function main() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  
  // controllers
  
  
  // controller's routing
  
  // run server
  const port = config.get("server.port") as number ?? 80;
  app.listen(
    port, "localhost",
    () => console.log(`Listening on :${port}`)
  );
}

main()
  .catch((err) => console.error(err));