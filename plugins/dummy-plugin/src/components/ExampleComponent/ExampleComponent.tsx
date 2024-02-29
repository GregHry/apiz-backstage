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
import { ExampleFetchComponent } from '../ExampleFetchComponent';

export const ExampleComponent = () => {
  return (
  <Page themeId="tool">
    <Header title="DummyJSON" subtitle="Fake REST API of JSON data">
      <HeaderLabel label="Owner" value="GregH" />
      <HeaderLabel label="Lifecycle" value="experimental" />
    </Header>
    <Content>
      <ContentHeader title="This is a title">
        <SupportButton>Support? What support? Idk bro</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title="Information card">
            <Typography variant="body1">
              Tired of Lorem ipsum ? Try DummyJSON !
            </Typography>
          </InfoCard>
          
        </Grid>
        <Grid item>
          
          <ExampleFetchComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
};
