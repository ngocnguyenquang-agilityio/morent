import { factories } from "@strapi/strapi";
import { PAGE_SIZE_DEFAULTS } from "../../../../constant";

export default factories.createCoreController(
  "api::rental.rental",
  ({ strapi }) => ({
    async myRentals(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("Authentication required");
      }

      const page = Number(ctx.query.page) || 1;
      const pageSize =
        Number(ctx.query.pageSize) || PAGE_SIZE_DEFAULTS.MY_RENTALS;
      const offset = (page - 1) * pageSize;

      const [results, total] = await Promise.all([
        strapi.documents("api::rental.rental").findMany({
          filters: { user: { id: { $eq: user.id } } },
          populate: {
            car: {
              populate: ["image", "thumbnails"],
            },
          },
          limit: pageSize,
          offset,
        }),
        strapi.documents("api::rental.rental").count({
          filters: { user: { id: { $eq: user.id } } },
        }),
      ]);

      const sanitizedResults = await Promise.all(
        results.map((result) => this.sanitizeOutput(result, ctx)),
      );

      return this.transformResponse(sanitizedResults, {
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize),
          total,
        },
      });
    },
  }),
);
