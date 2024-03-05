import {
    createUnifiedTheme,
    palettes
  } from '@backstage/theme';
  
  export const multicolorTheme = createUnifiedTheme({  
    palette: {  
      ...palettes.light,
      primary: {  
        main: '#FB4341',
      },  
      secondary: {  
        main: '#D62020',
      },  
      background: {  
        default: '#FFFFFF',
      },  
      navigation: {  
        background: '#031a6b',
        indicator: '#FB4341',
        selectedColor: '#FFFFFF',
        color: '#FFFFFF',
        navItem: {  
          hoverBackground: '#f50c1a',
        },  
      },    
    },
   // fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', // Moved fontFamily here
    fontFamily: '"Lato","Helvetica Neue", Helvetica, Arial, sans-serif', // Moved fontFamily here
    components: {
      MuiButton: {  
        styleOverrides: { 
          root: {  
            textTransform: 'none',
          },  
          containedPrimary: {  
            backgroundColor: '#001952',
            '&:hover': {  
              backgroundColor: '#D62020',
            },  
            color: '#FFFFFF',  
          },  
          containedSecondary: {  
            backgroundColor: '#FB4341',
            '&:hover': {  
              backgroundColor: '#D62020',
            },  
            color: '#FFFFFF',  
          },  
        },  
      },  
    },
    defaultPageTheme: 'home',  
  });
  