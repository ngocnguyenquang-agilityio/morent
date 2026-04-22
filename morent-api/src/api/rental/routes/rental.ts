import { factories } from '@strapi/strapi';

const defaultRouter = factories.createCoreRouter('api::rental.rental');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes;
      return extraRoutes.concat(routes);
    },
  };
};

const myExtraRoutes = [
  {
    method: 'GET',
    path: '/rentals/my-rentals',
    handler: 'rental.myRentals',
    config: {
      policies: [],
      middlewares: [],
    },
  },
];

export default customRouter(defaultRouter, myExtraRoutes);
