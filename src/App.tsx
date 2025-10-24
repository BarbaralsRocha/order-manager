import React from 'react';
import './App.css';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { store } from './frontend/commons/redux/store';
import { Auth0Provider } from '@auth0/auth0-react';
const redirectPath =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_FRONTEND_URL
    : process.env.REACT_APP_FRONTEND_URL_HML;
console.log({ redirectPath });
const App: React.FC = () => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN || ''}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ''}
      authorizationParams={{
        redirect_uri: `${redirectPath}/callback`,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      }}
    >
      <Provider store={store()}>
        <ThemeProvider theme={theme}>
          <Routes />;
        </ThemeProvider>
      </Provider>
    </Auth0Provider>
  );
};

export default App;
