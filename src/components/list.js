import React, { Component } from 'react';
import ListItem from './list_item';
import connectHorizon from '../lib/connect_horizon';

class List extends Component {
  render() {
    return (
      <ul>{this.props.items.map((item) => <ListItem key={item.id} {...item} />)}</ul>
    );
  }
}

const ListContainer = connectHorizon(List, {
  queries: {
    items: (hz) => hz('items')
  }
});

export default ListContainer;
