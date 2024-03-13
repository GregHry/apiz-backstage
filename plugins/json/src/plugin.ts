import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const jsonPlugin = createPlugin({
  id: 'json',
  routes: {
    root: rootRouteRef,
  },
});

export const JsonPage = jsonPlugin.provide(
  createRoutableExtension({
    name: 'JsonPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
