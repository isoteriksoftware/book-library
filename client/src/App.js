import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Index from './pages'
import theme from './themes/default'
import Checkout from './pages/checkout';
import Checkin from './pages/checkin';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <LocalizationProvider dateAdapter={AdapterMoment}>
        <BrowserRouter>
          <Switch>
            <Route path='/checkin/:isbn'>
              <Checkin/>
            </Route>
            <Route path='/checkout/:isbn'>
              <Checkout/>
            </Route>
            <Route path='/'>
              <Index/>
            </Route>
          </Switch>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App