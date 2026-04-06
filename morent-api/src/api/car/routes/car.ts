import { factories } from '@strapi/strapi';

const defaultRouter = factories.createCoreRouter('api::car.car');

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
    path: '/cars/recommendations',
    handler: 'car.recommendations',
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/cars/popular',
    handler: 'car.popular',
    config: {
      auth: false,
    },
  },
];

export default customRouter(defaultRouter, myExtraRoutes);
