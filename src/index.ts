import "reflect-metadata";

import { Server } from "./server";
import { Database } from "./database";

async function createApp() {
  await new Database().connect();
  await new Server().start();
}

createApp();
