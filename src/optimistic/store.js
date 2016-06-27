export function storeRecord(data, input) {
  return data.concat(input);
}

export function storeAllRecords(data, input) {
  if (Array.isArray(input)) {
    return input.reduce(storeRecord, data);
  } else {
    return storeRecord(data, input);
  }
}
