import path from "path";
import type { Core } from "@strapi/strapi";

import { DATABASE, ENV_DEFAULTS } from "../constant";

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Database => {
  const client = env(DATABASE.CLIENT, ENV_DEFAULTS.DB_CLIENT);

  const connections = {
    mysql: {
      connection: {
        host: env(DATABASE.HOST, ENV_DEFAULTS.DB_HOST),
        port: env.int(DATABASE.PORT, 3306),
        database: env(DATABASE.NAME, ENV_DEFAULTS.DB_NAME),
        user: env(DATABASE.USERNAME, ENV_DEFAULTS.DB_USERNAME),
        password: env(DATABASE.PASSWORD, ENV_DEFAULTS.DB_PASSWORD),
        ssl: env.bool(DATABASE.SSL, false) && {
          key: env(DATABASE.SSL_KEY, undefined),
          cert: env(DATABASE.SSL_CERT, undefined),
          ca: env(DATABASE.SSL_CA, undefined),
          capath: env(DATABASE.SSL_CAPATH, undefined),
          cipher: env(DATABASE.SSL_CIPHER, undefined),
          rejectUnauthorized: env.bool(DATABASE.SSL_REJECT_UNAUTHORIZED, true),
        },
      },
      pool: {
        min: env.int(DATABASE.POOL_MIN, ENV_DEFAULTS.DB_POOL_MIN),
        max: env.int(DATABASE.POOL_MAX, ENV_DEFAULTS.DB_POOL_MAX),
      },
    },
    postgres: {
      connection: {
        connectionString: env(DATABASE.URL),
        host: env(DATABASE.HOST, ENV_DEFAULTS.DB_HOST),
        port: env.int(DATABASE.PORT, 5432),
        database: env(DATABASE.NAME, ENV_DEFAULTS.DB_NAME),
        user: env(DATABASE.USERNAME, ENV_DEFAULTS.DB_USERNAME),
        password: env(DATABASE.PASSWORD, ENV_DEFAULTS.DB_PASSWORD),
        ssl: env.bool(DATABASE.SSL, false) && {
          key: env(DATABASE.SSL_KEY, undefined),
          cert: env(DATABASE.SSL_CERT, undefined),
          ca: env(DATABASE.SSL_CA, undefined),
          capath: env(DATABASE.SSL_CAPATH, undefined),
          cipher: env(DATABASE.SSL_CIPHER, undefined),
          rejectUnauthorized: env.bool(DATABASE.SSL_REJECT_UNAUTHORIZED, true),
        },
        schema: env(DATABASE.SCHEMA, "public"),
      },
      pool: {
        min: env.int(DATABASE.POOL_MIN, ENV_DEFAULTS.DB_POOL_MIN),
        max: env.int(DATABASE.POOL_MAX, ENV_DEFAULTS.DB_POOL_MAX),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env(DATABASE.FILENAME, ".tmp/data.db"),
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int(
        DATABASE.CONNECTION_TIMEOUT,
        ENV_DEFAULTS.TIMEOUT,
      ),
    },
  };
};

export default config;
