import React, { Component } from 'react';
import { render } from 'react-dom';
import { HorizonProvider, HorizonRoute } from '../../src/index';
import ChatAppContainer from './containers/chat';

const Horizon = window.Horizon;
const horizonInstance = Horizon({ host: 'localhost:8181' });

const App = () => (
  <HorizonProvider instance={horizonInstance}>
    <ChatAppContainer />
  </HorizonProvider>
);

render(<App />, document.getElementById('app1'));
render(<App />, document.getElementById('app2'));
