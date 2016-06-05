# React Horizon

<img src="logo.png" width="110" height="110" alt="logo" />

*Higher-order React component which handles subscriptions and mutations to horizon.io realtime backend*

## Installation
```
$ npm i react-hz
```

## Usage

Read Horizon's [Collection API](http://horizon.io/api/collection/) for querying methods.

`react-hz` package provides `connect` function which wraps React component with specified queries and mutations. Connector functions expects two arguments: React component and query/mutation config object.

### Queries

`queries` is a map of query names to query functions. Data behind query is available as a prop with the same name in React component. Query function receives Horizon `hz` function which should be used to construct a query using Horizon's Collection API.

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

`mutations` is a map of mutation query names to mutation query functions. Specified mutations are available as props in React component behind their corresponding names in config.

Available mutation operations:
- `remove` - http://horizon.io/api/collection/#remove
- `removeAll` - http://horizon.io/api/collection/#removeall
- `replace` - http://horizon.io/api/collection/#replace
- `store` - http://horizon.io/api/collection/#store
- `upsert` - http://horizon.io/api/collection/#upsert

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
