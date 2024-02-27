import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { dummyPluginPlugin, DummyPluginPage } from '../src/plugin';

createDevApp()
  .registerPlugin(dummyPluginPlugin)
  .addPage({
    element: <DummyPluginPage />,
    title: 'Root Page',
    path: '/dummy-plugin'
  })
  .render();
