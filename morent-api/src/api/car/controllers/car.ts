import { factories } from "@strapi/strapi";
import { PAGE_SIZE_DEFAULTS } from "../../../../constant";

export default factories.createCoreController("api::car.car", ({ strapi }) => ({
  async recommendations(ctx) {
    const pageSize =
      Number(ctx.query.pageSize) || PAGE_SIZE_DEFAULTS.RECOMMENDATION;

    const results = await strapi.documents("api::car.car").findMany({
      populate: ["image", "thumbnails"],
      sort: ["rate:desc"],
      limit: pageSize,
      status: "published",
    });

    const sanitizedResults = await Promise.all(
      results.map((result) => this.sanitizeOutput(result, ctx)),
    );

    return this.transformResponse(sanitizedResults, {
      pagination: {
        page: 1,
        pageSize,
        pageCount: 1,
        total: results.length,
      },
    });
  },

  async popular(ctx) {
    const pageSize = Number(ctx.query.pageSize) || PAGE_SIZE_DEFAULTS.POPULAR;

    const results = await strapi.documents("api::car.car").findMany({
      populate: ["image", "thumbnails"],
      sort: ["reviewer:desc"],
      limit: pageSize,
      status: "published",
    });

    const sanitizedResults = await Promise.all(
      results.map((result) => this.sanitizeOutput(result, ctx)),
    );

    return this.transformResponse(sanitizedResults, {
      pagination: {
        page: 1,
        pageSize,
        pageCount: 1,
        total: results.length,
      },
    });
  },
}));
