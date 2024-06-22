import React from 'react';
import './App.css';
import Routes from './Routes';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store()}>
      <Routes />;
    </Provider>
  );
};

export default App;
