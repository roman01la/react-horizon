import React, { Component } from 'react';
import { render } from 'react-dom';
import { Horizon, HorizonProvider, HorizonRoute } from '../../src/index';
import ChatApp from './components/chat';

const horizonInstance = Horizon({ host: 'localhost:8181' });

const App = () => (
  <HorizonProvider instance={horizonInstance}>
    <HorizonRoute renderSuccess={() => <ChatApp />} />
  </HorizonProvider>
);

render(<App />, document.getElementById('app1'));
render(<App />, document.getElementById('app2'));
