import React, { Component, PropTypes } from 'react';
import shallowequal from 'shallowequal';
import hash from 'object-hash';

export default function connect(ReactComponent, { subscriptions = {}, mutations = {} }) {

  return class extends Component {

    static displayName = `Horizon(${ReactComponent.displayName || ReactComponent.name})`

    static contextTypes = {
      hz: PropTypes.func,
      subscribe: PropTypes.func,
      unsubscribe: PropTypes.func,
      configureOptimisticUpdate: PropTypes.func,
    }

    constructor(props, context) {

      super(props, context);

      this._subscriptions = [];
      this._mutations = {};
      this._collections = {};

      this.state = {};

      this._subscribe = this._subscribe.bind(this);
      this._unsubscribe = this._unsubscribe.bind(this);
      this._createMutations = this._createMutations.bind(this);
      this._handleUpdate = this._handleUpdate.bind(this);
      this._optimisticUpdate = this._optimisticUpdate.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
      return shallowequal(nextProps, this.props) === false ||
             shallowequal(nextState, this.state) === false;
    }
    componentWillReceiveProps(nextProps) {
      this._subscribe(this.context.hz, nextProps);
    }
    componentWillMount() {
      this._unsubscribe();
      this._subscribe(this.context.hz, this.props);
      this._createMutations(this.context.hz);
    }
    componentWillUnmount() {
      this._unsubscribe();
    }
    _subscribe(hz, props) {
      Object.keys(subscriptions)
        .forEach((qname) => {

          const q = subscriptions[qname];
          const qsub = q(hz, props);
          const qhash = hash(qsub._query);

          // local mapping from query hash to query name
          this._subscriptions[qhash] = qname;

          // local mapping from query collection name to queries hash
          this._collections[qsub._query.collection] = this._collections[qsub._query.collection] || [];
          this._collections[qsub._query.collection].push(qhash);

          this.context.subscribe(qhash, qsub, this._handleUpdate);
        });
    }
    _unsubscribe() {

      this.context.unsubscribe(this._handleUpdate, Object.keys(this._subscriptions));

      this._subscriptions = {};
      this._mutations = {};
      this._collections = {};
    }
    _createMutations(hz) {
      Object.keys(mutations)
        .forEach((mname) => {
          this._mutations[mname] = mutations[mname](hz, this._optimisticUpdate);
        });
    }
    _handleUpdate(hash, data) {
      // get query name by its hash and assign received data
      this.setState({
        [this._subscriptions[hash]]: data
      });
    }
    _optimisticUpdate(collection) {
      return this.context.configureOptimisticUpdate(collection, this._collections[collection]);
    }
    render() {
      return <ReactComponent {...this.props} {...this.state} {...this._mutations} />;
    }
  }
}
