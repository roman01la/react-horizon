import React, { Component, PropTypes } from 'react';
import shallowequal from 'shallowequal';

export function withQueries({ subscriptions = {}, mutations = {} }) {
  return function(ReactComponent) {
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
          }, {});

        this._subscribe = this._subscribe.bind(this);
        this._unsubscribe = this._unsubscribe.bind(this);
        this._createMutations = this._createMutations.bind(this);
      }
      shouldComponentUpdate(nextProps, nextState) {
        return shallowequal(nextProps, this.props) === false ||
              shallowequal(nextState, this.state) === false;
      }
      componentWillReceiveProps(nextProps) {
        this._unsubscribe(this._subscriptions);
        this._subscribe(this.context.hz, nextProps);
      }
      componentWillMount() {
        this._subscribe(this.context.hz, this.props);
        this._createMutations(this.context.hz);
      }
      componentWillUnmount() {
        this._unsubscribe(this._subscriptions);
      }
      _subscribe(hz, props) {
        Object.keys(subscriptions)
          .forEach((qname) => {
            const q = subscriptions[qname];
            const subscription = q(hz, props).watch().subscribe((data) => this.setState({ [qname]: data }));
            this._subscriptions.push(subscription);
          });
      }
      _unsubscribe(subscriptions) {
        subscriptions.forEach((q) => q.unsubscribe());
      }
      _createMutations(hz) {
        Object.keys(mutations)
          .forEach((mname) => {
            this._mutations[mname] = mutations[mname](hz);
          });
      }
      render() {
        return <ReactComponent {...this.props} {...this.state} {...this._mutations} />;
      }
    }
  }
}

export default function connect(ReactComponent, options) {
  return withQueries(options)(ReactComponent);
}
