import { createComponentExtension, createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

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


export const EntityDummyPluginCard = dummyPluginPlugin.provide(
  createComponentExtension({
    name: 'EntityDummyPluginCard',
    component: {
      lazy: () =>
        import('./components/EntityOverviewCard').then(m => m.EntityOverviewCard,
        ),
    },

  }),
);

//tried to make a tab according to the video, but few things were not working
// TODO : actually learn how to do it

// export const EntityDummyPluginContent = dummyPluginPlugin.provide(
//   createRoutableExtension({
//     name: 'EntityDummyPluginContent',
//     component: () =>
//       import('./components/EntityOverviewCard').then( m => m.EntityOverviewCard),
//       mountPoint: {

//       }
//   }),
// );