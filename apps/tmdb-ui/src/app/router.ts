import { createHashHistory, Router } from '@tanstack/react-router';

import { getConfigurationRoute } from './configuration';
import { getFaqRoute } from './faq';
import { getHomeRoute } from './home';
import { getRootRoute } from './root';

const rootRoute = getRootRoute();

rootRoute.addChildren([
  getHomeRoute(rootRoute),
  getFaqRoute(rootRoute),
  getConfigurationRoute(rootRoute),
]);

export const router = new Router({
  routeTree: rootRoute,
  history: createHashHistory(),
});
