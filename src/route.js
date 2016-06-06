import React, { Component, PropTypes } from 'react';
import shallowequal from 'shallowequal';

const noop = () => null;

class HorizonRoute extends Component {
  static contextTypes = {
    hz: PropTypes.func
  }
  static propTypes = {
    renderConnecting: PropTypes.func,
    renderDisconnected: PropTypes.func,
    renderConnected: PropTypes.func,
    renderSuccess: PropTypes.func,
    renderFailure: PropTypes.func,
  }
  static defaultProps = {
    renderConnecting: noop,
    renderDisconnected: noop,
    renderConnected: noop,
    renderSuccess: noop,
    renderFailure: noop,
  }
  constructor(props, context) {
    super(props, context);

    this.state = {
      status: undefined,
      error: undefined,
    };
  }
  componentWillMount() {
    this._status = this.context.hz.status(
      ({ type }) => this.setState({ status: type }),
      (error) => this.setState({ error }));
  }
  componentWillUnmount() {
    this._status.unsubscribe();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowequal(nextProps, this.props) === false ||
           shallowequal(nextState, this.state) === false;
  }
  render() {

    const { status, error } = this.state;

    switch (this.state.status) {
    case 'unconnected':
      return this.props.renderConnecting();
    case 'connected':
      return this.props.renderConnected();
    case 'ready':
      return this.props.renderSuccess();
    case 'error':
      return this.props.renderFailure(error)
    case 'disconnected':
      return this.props.renderDisconnected();
    default:
      return null;
    }
  }
}

export default HorizonRoute;
