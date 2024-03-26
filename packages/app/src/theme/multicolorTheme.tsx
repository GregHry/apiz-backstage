import {
  createUnifiedTheme,
  palettes
} from '@backstage/theme';

export const multicolorTheme = createUnifiedTheme({
  palette: {
    ...palettes.light,
    primary: {
      // couleur écriture principale
      main: '#56838a',
    },
    secondary: {
      main: '#D62020',
    },
    background: {
      default: '#FFFFFF',
    },
    navigation: {
      background: '#FFFFFF',
      // background: '#56838a',
      indicator: '#e6550e',
      selectedColor: '#f3a064',
      // selectedColor: '#FFFFFF',
      color: '#757575',
      //  color: '#FFFFFF',
      	// gris-vert: #56838a
        // orange: #e6550e
        // orange clair: #f3a064
        // gris plus clair : #999999
        // #fadccb - Orange assez clair
      navItem: {
        hoverBackground: '#FFFFFF',
        // hoverBackground: '#FAF9F6',
      },
    },
  },
  fontFamily: '"Lato","Helvetica Neue", Helvetica, Arial, sans-serif',
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        containedPrimary: {
          backgroundColor: '#001952',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#D62020',
            color: '#FFFFFF', // Changement de couleur du texte au survol
          },
        },
        containedSecondary: {
          backgroundColor: '#FB4341',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#D62020',
            color: '#FFFFFF', // Changement de couleur du texte au survol
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          transition: 'color 0.3s ease',
          '&:hover': { 
            filter: 'brightness(120%)',
          },
        },
      },
    },
  },
  defaultPageTheme: 'home',
});
