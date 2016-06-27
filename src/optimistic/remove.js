export function removeRecord(data, input) {
  if (isNumeric(input)) {
    return data.filter(({ id }) => id !== input);
  } else {
    return data.filter(({ id }) => id !== input.id);
  }
}

export function removeAllRecords(data, input) {
  if (Array.isArray(input) && input.every((v) => isNumeric(v) || typeof v === 'object')) {
    return input.reduce(removeRecord, data);
  }
}
