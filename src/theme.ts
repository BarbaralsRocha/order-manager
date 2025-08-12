// src/theme.ts
import { createTheme } from '@mui/material/styles';

interface NeutralColors {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    neutral: {
      light: NeutralColors;
      dark: NeutralColors;
    };
  }
  interface PaletteOptions {
    neutral?: {
      light?: NeutralColors;
      dark?: NeutralColors;
    };
  }
}
const theme = createTheme({
  palette: {
    primary: {
      main: '#121212',
      light: '#ffe799',
      dark: '#fbc105',
      contrastText: '#fbc105',
    },
    neutral: {
      light: {
        main: '#cccccc',
        light: '#f0f0f0',
        dark: '#b8b8b8',
        contrastText: '#fff',
      },
      dark: {
        main: '#666666',
        light: '#3d3d3d',
        dark: '#1f1f1f',
        contrastText: '#121212',
      },
    },
    success: {
      main: '#0A9E5A',
    },
    error: {
      main: '#cc3333',
    },
  },
  spacing: 8,
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    allVariants: {
      color: '#121212',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'neutral.dark.contrastText',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'neutral.dark.contrastText',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          letterSpacing: 1,
          textTransform: 'none',
        },
        sizeSmall: {
          padding: '4px 8px',
        },
        sizeMedium: {
          padding: '8px 16px',
        },
        sizeLarge: {
          padding: '12px 24px',
        },
        containedPrimary: {
          backgroundColor: '#fbc105',
          color: '#121212',
          '&:hover': {
            backgroundColor: '#ffe799',
          },
        },
        containedSecondary: {
          backgroundColor: '#fff',
          color: '#121212',
          borderColor: '#121212',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#f0f0f0',
            borderColor: '#f0f0f0',
          },
        },
        outlinedPrimary: {
          border: '2px #121212 solid',
          color: '#121212',
          '&:hover': {
            borderColor: '#f0f0f0',
            backgroundColor: '#f0f0f0',
          },
        },
        outlinedSecondary: {
          borderColor: '#00FF00',
          color: '#00FF00',
          '&:hover': {
            borderColor: '#00CC00',
            backgroundColor: 'rgba(0, 255, 0, 0.04)',
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
        },
      },
    },
  },
});

export default theme;
