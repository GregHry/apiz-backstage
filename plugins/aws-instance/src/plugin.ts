import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const awsInstancePlugin = createPlugin({
  id: 'aws-instance',
  routes: {
    root: rootRouteRef,
  },
});

export const AwsInstancePage = awsInstancePlugin.provide(
  createRoutableExtension({
    name: 'AwsInstancePage',
    component: () =>
      import('./components/UIComponent/UIComponent').then(m => m.UIComponent),
    mountPoint: rootRouteRef,
  }),
);
