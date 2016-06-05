import React, { Component } from 'react';
import hz from '@horizon/client';

export function connect(ReactComponent, { subscriptions = {}, mutations = {} }) {
  return class extends Component {
    constructor(props) {
      super(props);
      this._subscriptions = [];
      this._mutations = {};
      this.state = Object.keys(subscriptions)
        .reduce((initialState, qname) => {
          initialState[qname] = [];
          return initialState;
        }, {})
    }
    componentWillMount() {
      Object.keys(subscriptions)
        .forEach((qname) => {
          const q = subscriptions[qname];
          const subscription = q(hz).watch().subscribe((data) => this.setState({ [qname]: data }))
          this._subscriptions.push(subscription)
        })
      Object.keys(mutations)
        .forEach((mname) => {
          this._mutations[mname] = mutations[mname](hz)
        })
    }
    componentWillUnmount() {
      this._subscriptions.forEach((q) => q.dispose())
    }
    render() {
      return <ReactComponent {...this.props} {...this.state} {...this._mutations} />;
    }
  }
}
