# React Horizon

<img src="logo.png" width="110" height="110" alt="logo" />

*Higher-order React component which handles subscriptions and mutations to horizon.io realtime backend*

`react-hz` provides higher-order React component to query and mutate data on Horizon's backend.

See Horizon's [Collection API](http://horizon.io/api/collection/) for querying methods

## Installation
```
$ npm i react-hz
```

## Usage

### Queries
```js
import React, { Component } from 'react';
import { connect } from 'react-hz';

class App extends Component {
  render() {
    return (
      <ul>{this.props.items.map(({ id, title }) => <li key={id}>{title}</li>)}</ul>
    );
  }
}

const AppContainer = connect(App, {
  queries: {
    items: (hz) => hz('items')
  }
});

export default AppContainer;
```

### Mutations
```js
import React, { Component } from 'react';
import { connect } from 'react-hz';

class App extends Component {
  render() {
    return (
      <button onClick={() => this.props.items.store({ title: 'Item' })}>add</button>
    );
  }
}

const AppContainer = connectHorizon(App, {
  mutations: {
    items: (hz) => hz('items')
  }
});

export default AppContainer;

```
