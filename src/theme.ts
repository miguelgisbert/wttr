import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5', // Blau
    },
    secondary: {
      main: '#e3f2fd', // Blau molt clar
    },
    background: {
      default: '#f5f5f5', // Gris molt clar
    },
    text: {
      primary: '#0d47a1', // Blau fosc
      secondary: '#757575', // Gris
    },
  },
});

export default theme;