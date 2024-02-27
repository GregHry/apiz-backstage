import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const dummyPluginPlugin = createPlugin({
  id: 'dummy-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const DummyPluginPage = dummyPluginPlugin.provide(
  createRoutableExtension({
    name: 'DummyPluginPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
