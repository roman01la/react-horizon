import React, { Component } from 'react';
import hz from '@horizon/client';

export function connect(ReactComponent, { queries = {}, mutations = {} }) {
  return class extends Component {
    constructor(props) {
      super(props);
      this._queries = [];
      this._mutations = {};
      this.state = Object.keys(queries)
        .reduce((initialState, qname) => {
          initialState[qname] = [];
          return initialState;
        }, {})
    }
    componentWillMount() {
      Object.keys(queries)
        .forEach((qname) => {
          const q = queries[qname];
          const subscription = q(hz).watch().subscribe((data) => this.setState({ [qname]: data }))
          this._queries.push(subscription)
        })
      Object.keys(mutations)
        .forEach((mname) => {
          this._mutations[mname] = mutations[mname](hz)
        })
    }
    componentWillUnmount() {
      this._queries.forEach((q) => q.dispose())
    }
    render() {
      return <ReactComponent {...this.props} {...this.state} {...this._mutations} />;
    }
  }
}
