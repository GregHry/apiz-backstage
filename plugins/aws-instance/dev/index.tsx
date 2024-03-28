import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { awsInstancePlugin, AwsInstancePage } from '../src/plugin';

createDevApp()
  .registerPlugin(awsInstancePlugin)
  .addPage({
    element: <AwsInstancePage />,
    title: 'Root Page',
    path: '/aws-instance'
  })
  .render();
