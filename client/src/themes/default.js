import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#FFC605',
    },
    secondary: {
      main: '#1E1E1E',
    },
    background: {
      default: '#FCFCFC',
    }
  },

  typography: {
    fontFamily: "'Poppins', Roboto, Helvetica, Arial, sans-serif",
  },

  appBar: {
    background: 'white',
    color: '#1E1E1E',
  },
  colors: {
    textLight: '#FCFCFC',
    textDark: '#000000',
    primaryVariant: '#1A874A'
  }
});

export default theme;