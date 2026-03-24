import type { Core } from "@strapi/strapi";

import { ADMIN } from "@constant";

const config = ({
  env,
}: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env(ADMIN.JWT_SECRET),
  },
  apiToken: {
    salt: env(ADMIN.API_TOKEN_SALT),
  },
  transfer: {
    token: {
      salt: env(ADMIN.TRANSFER_TOKEN_SALT),
    },
  },
  secrets: {
    encryptionKey: env(ADMIN.ENCRYPTION_KEY),
  },
  flags: {
    nps: env.bool(ADMIN.FLAG_NPS, true),
    promoteEE: env.bool(ADMIN.FLAG_PROMOTE_EE, true),
  },
});

export default config;
