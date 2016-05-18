import React, { Component } from 'react';
import { render } from 'react-dom';
import ListContainer from './components/list';
import InputFieldContainer from './components/input_field';

class App extends Component {
  render() {
    return (
      <div>
        <ListContainer />
        <InputFieldContainer />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
