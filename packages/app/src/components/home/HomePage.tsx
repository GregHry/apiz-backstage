// Base imports to build the home page
import {  
    HomePageToolkit,  
    HomePageStarredEntities,  
    TemplateBackstageLogoIcon,  
  } from '@backstage/plugin-home';  
  import { Content, Page } from '@backstage/core-components';  
  import { Grid, makeStyles } from '@material-ui/core';  
  import React from 'react';  
  import { SearchContextProvider } from '@backstage/plugin-search-react';  
  import { HomePageSearchBar } from '@backstage/plugin-search';  
  import ApizHomePage from '../../assets/Apiz_Homepage.jpg'
  
  import { DevQuote } from '@parsifal-m/plugin-dev-quotes-homepage';
  
  // Styles
  const useStyles = makeStyles(theme => ({  
    // Ajout d'une classe pour le fond d'écran
    content: {
        
        backgroundImage: `url(${ApizHomePage})`, // Utilisation de Wallpaperr comme fond d'écran
        // backgroundImage: `url(${Wallpaperr})`, // Utilisation de Wallpaperr comme fond d'écran
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundSize: '100% auto', // Réglage de la taille du fond d'écran à 60% de la largeur disponible
    },
    
    searchBarInput: {  
      maxWidth: '60vw',  
      margin: 'auto',  
      backgroundColor: theme.palette.background.paper,  
      borderRadius: '50px',  
      boxShadow: theme.shadows[1],  
    },  
    searchBarOutline: {  
      borderStyle: 'none',  
    },  
  }));  
    
    
  export const HomePage = () => {  
    const classes = useStyles();  
     
    
    // Direct links to useful locations, which you can change to whatever you want
    const tools = [  
      {  
        url: '/create/actions',  
        label: 'Create/Actions',  
        icon: <TemplateBackstageLogoIcon />,  
      },  
      {  
        url: '/docs',  
        label: 'Docs',  
        icon: <TemplateBackstageLogoIcon />,  
      },  
      {  
        url: '/catalog?filters%5Bkind%5D=user',  
        label: 'User Catalog',  
        icon: <TemplateBackstageLogoIcon />,  
      },  
      {  
        url: '/catalog?filters%5Bkind%5D=group',  
        label: 'Group Catalog',  
        icon: <TemplateBackstageLogoIcon />,  
      },  
    ];  
    
    // Use the search bar and starred entities as is
    return (  
      <SearchContextProvider>  
        <Page themeId="home">  
          <Content className={classes.content}>
          
            <Grid container justifyContent="center" spacing={6} style={{ marginTop: '300px' }}>  
            
              <Grid container item xs={12} justifyContent="center">  
                <HomePageSearchBar  
                  InputProps={{  
                    classes: { root: classes.searchBarInput, notchedOutline: classes.searchBarOutline },  
                  }}  
                  placeholder="Search"  
                />  
              </Grid>  
              <Grid container item xs={12}>  
                <Grid item xs={12} md={6}>  
                  <HomePageStarredEntities />  
                </Grid> 
                <Grid item md={4} xs={12}>
                  <DevQuote />
                </Grid> 
                <Grid item xs={12} md={6}>  
                  <HomePageToolkit tools={tools} />  
                </Grid>  
                 
              </Grid>  
            </Grid>  
          </Content>  
        </Page>  
      </SearchContextProvider>  
    );  
  };  