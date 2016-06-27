import React, { Component, PropTypes } from 'react';
import shallowequal from 'shallowequal';
import uuid from 'uuid';
import performUpdate from './optimistic';

const mutOps = [
  'remove',
  'removeAll',
  'replace',
  'store',
  'upsert',
];

function tempid(input) {
  return {
    ...input,
    id: uuid.v4()
  };
}

class HorizonProvider extends Component {
  static propTypes = {
    instance: PropTypes.func,
  }
  static childContextTypes = {
    hz: PropTypes.func,
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func,
    configureOptimisticUpdate: PropTypes.func,
  }
  getChildContext() {
    return {
      hz: this.props.instance,
      subscribe: this._handleSubscription,
      unsubscribe: this._handleUnsubscription,
      configureOptimisticUpdate: this._configureOptimisticUpdate,
    };
  }
  constructor(props, context) {
    super(props, context);

    this.props.instance.connect();

    // subscriptions storage
    this._subscriptions = {};

    this._listeners = {};

    // remote data storage
    this.state = {};

    this._handleSubscription = this._handleSubscription.bind(this);
    this._updateListeners = this._updateListeners.bind(this);
    this._handleUnsubscription = this._handleUnsubscription.bind(this);
    this._configureOptimisticUpdate = this._configureOptimisticUpdate.bind(this);
    this._performOptimisticUpdate = this._performOptimisticUpdate.bind(this);
  }
  _handleSubscription(qhash, query, fn) {

    // register listener function
    this._listeners[qhash] = this._listeners[qhash] || [];
    this._listeners[qhash].push(fn);

    // create subscription if it was not created before
    if (this._subscriptions[qhash] === undefined) {

      const sub = query.watch().subscribe((data) => {
        const hash = qhash;
        // update listeners when remote data updates
        this.setState({ [hash]: data }, () => this._updateListeners(hash));
      });

      this._subscriptions[qhash] = sub;
    }
  }
  _updateListeners(hash) {
    this._listeners[hash].forEach((fn) => fn(hash, this.state[hash]));
  }
  _handleUnsubscription(fn, hashes) {
    hashes.forEach((hash) => {
      const listeners = this._listeners[hash];

      // filter out listener function for current query hash
      this._listeners[hash] = listeners.filter((lfn) => lfn !== fn);

      // if there are no listeners to current query
      // unsubscribe and delete subscription
      if (this._listeners[hash].length === 0) {
        this._subscriptions[hash].unsubscribe();
        this._subscriptions[hash] = undefined;
      }
    });
  }
  _configureOptimisticUpdate(collection, hashes) {
    return mutOps.reduce((p, op) => {
      p[op] = (input) => {
        this._performOptimisticUpdate(hashes, op, tempid(input));
        return this.props.instance(collection)[op](input);
      };
      return p;
    }, {});
  }
  _performOptimisticUpdate(hashes, op, input) {

    hashes.forEach((hash) => {
      const nextData = performUpdate(this.state[hash], op, input);
      this.setState({ [hash]: nextData }, () => this._updateListeners(hash));
    });
  }
  render() {
    return React.Children.only(this.props.children);
  }
}

export default HorizonProvider;
