import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { User } from "./api/User/User.entity";
import {
  __dbHost__,
  __dbPort__,
  __dbUser__,
  __dbPassword__,
  __dbName__,
} from "./constants";

const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: __dbHost__,
  port: __dbPort__,
  username: __dbUser__,
  password: __dbPassword__,
  database: __dbName__,
  synchronize: true,
  logging: false,
  entities: [User],
};

export { typeOrmConfig };
