# React Horizon

*Higher-order React component which handles subscriptions to horizon.io realtime backend*

**NOT A LIBRARY**

## Queries
```js
import React, { Component } from 'react';
import ListItem from './list_item';
import connectHorizon from '../lib/connect_horizon';

class List extends Component {
  render() {
    return (
      <ul>{this.props.items.map((item) => <ListItem key={item.id} {...item} />)}</ul>
    );
  }
}

const ListContainer = connectHorizon(List, {
  queries: {
    items: (hz) => hz('items')
  }
});

export default ListContainer;
```

## Mutations
```js
import React, { Component } from 'react';
import connectHorizon from '../lib/connect_horizon';

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

const InputFieldContainer = connectHorizon(InputField, {
  mutations: {
    items: (hz) => hz('items')
  }
});

export default InputFieldContainer;

```
