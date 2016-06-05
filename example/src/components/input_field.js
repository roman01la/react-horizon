import React, { Component } from 'react';
import { connect } from '../../../src/index';

class InputField extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }
  render() {
    return (
      <div>
        <input
          value={this.state.value}
          onChange={(event) => this.setState({ value: event.target.value })} />
        <button onClick={() => this.props.items.store({ title: this.state.value })}>Add item</button>
      </div>
    );
  }
}

const InputFieldContainer = connect(InputField, {
  mutations: {
    items: (hz) => hz('items')
  }
});

export default InputFieldContainer;
