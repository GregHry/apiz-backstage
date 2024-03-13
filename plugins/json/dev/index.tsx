import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { jsonPlugin, JsonPage } from '../src/plugin';

createDevApp()
  .registerPlugin(jsonPlugin)
  .addPage({
    element: <JsonPage />,
    title: 'Root Page',
    path: '/json'
  })
  .render();
