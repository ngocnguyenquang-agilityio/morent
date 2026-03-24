import type { Core } from "@strapi/strapi";

import { ENV_DEFAULTS, SERVER } from "@constant";

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env(SERVER.HOST, ENV_DEFAULTS.SERVER_HOST),
  port: env.int(SERVER.PORT, ENV_DEFAULTS.SERVER_PORT),
  app: {
    keys: env.array(SERVER.APP_KEYS),
  },
});

export default config;
