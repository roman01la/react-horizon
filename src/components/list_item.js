import React from 'react';

const ListItem = ({ id, title }) => (
  <li>{`#${id} ${title}`}</li>
);

export default ListItem;
