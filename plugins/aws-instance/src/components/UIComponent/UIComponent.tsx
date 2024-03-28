import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { ServerFetchComponent } from '../FetchComponent/ServerFetchComponent';
// import BasicSwitch from '../Switch';

export const UIComponent = () => (
  <Page themeId="tool">
    <Header title="AWS Server Control Page" subtitle="">
      <HeaderLabel label="Owner" value="GregH" />
      <HeaderLabel label="Lifecycle" value="Experimental" />
    </Header>
    <Content>
      <ContentHeader title="Manage your AWS Servers">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title="What does this plugin do ?">
            <Typography variant="body1">
            This plugin enables an easy and seamless configuration of your AWS Servers.
            </Typography>
          </InfoCard>
        </Grid>
        <Grid item>
          <ServerFetchComponent />
        </Grid>
        {/* <Grid item>
          <BasicSwitch />
        </Grid> */}
      </Grid>
    </Content>
  </Page>
);
