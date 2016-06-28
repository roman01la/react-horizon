export const collection = [
  'find', 'findAll', 'justInitial',
  'order', 'above', 'below', 'limit'
];

export const find = [];

export const findAll = {
  one: ['order', 'above', 'below', 'limit'],
  list: []
};

export const above = ['findAll', 'order', 'below', 'limit'];
export const below = ['findAll', 'order', 'above', 'limit'];
export const order = ['findAll', 'above', 'below', 'limit'];
export const limit = [];
