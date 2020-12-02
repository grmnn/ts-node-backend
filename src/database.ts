import { createConnection } from "typeorm";
import { typeOrmConfig } from "./typeormconfig";

export class Database {
  async connect() {
    await createConnection(typeOrmConfig);
    console.log("💾 [Typeorm]: Database connected.");
  }
}
