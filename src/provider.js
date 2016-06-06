import React, { Component, PropTypes } from 'react';

class HorizonProvider extends Component {
  static propTypes = {
    instance: PropTypes.func,
  }
  static childContextTypes = {
    hz: PropTypes.func
  }
  getChildContext() {
    return { hz: this.props.instance };
  }
  constructor(props, context) {
    super(props, context);

    this.props.instance.connect();
  }
  render() {
    return React.Children.only(this.props.children);
  }
}

export default HorizonProvider;
