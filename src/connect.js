import React, { Component, PropTypes } from 'react';

export default function connect(ReactComponent, { subscriptions = {}, mutations = {} }) {
  return class extends Component {
    static contextTypes = {
      hz: PropTypes.func
    }
    constructor(props, context) {
      super(props, context);
      this._subscriptions = [];
      this._mutations = {};
      this.state = Object.keys(subscriptions)
        .reduce((initialState, qname) => {
          initialState[qname] = [];
          return initialState;
        }, {})
    }
    componentWillMount() {

      const hz = this.context.hz;

      Object.keys(subscriptions)
        .forEach((qname) => {
          const q = subscriptions[qname];
          const subscription = q(hz, this.props).watch().subscribe((data) => this.setState({ [qname]: data }))
          this._subscriptions.push(subscription)
        })
      Object.keys(mutations)
        .forEach((mname) => {
          this._mutations[mname] = mutations[mname](hz)
        })
    }
    componentWillUnmount() {
      this._subscriptions.forEach((q) => q.unsubscribe())
    }
    render() {
      return <ReactComponent {...this.props} {...this.state} {...this._mutations} />;
    }
  }
}
