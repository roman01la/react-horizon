import React from 'react';

const ListItem = ({ id, title, onRemove }) => (
  <li>
    {`#${id} ${title}`}
    <button onClick={() => onRemove(id)}>remove</button>
  </li>
);

export default ListItem;
