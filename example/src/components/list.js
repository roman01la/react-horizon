import React, { Component } from 'react';
import ListItem from './list_item';
import { connect } from '../../../src/index';

const List = ({ items, removeItem }) => (
  <ul>{items.map((item) => {
    return <ListItem key={item.id} onRemove={removeItem} {...item} />;
  })}</ul>
);

const ListContainer = connect(List, {
  subscriptions: {
    items: (hz) => hz('items')
  },
  mutations: {
    removeItem: (hz) => (id) => hz('items').remove(id)
  }
});

export default ListContainer;
