import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import Simulator from 'containers/simulator';
import './App.css';

const App = () => (
  <Provider store={store}>
    <Simulator />
  </Provider>
);

export default App;
