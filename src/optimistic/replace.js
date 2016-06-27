export function replaceRecord(data, input) {
  return data.map((record) => {
    if (record.id === input.id) {
      return input;
    } else {
      return record;
    }
  });
}

export function replaceAllRecords(data, input) {
  if (Array.isArray(input)) {
    return input.reduce(replaceRecord, data);
  } else {
    return replaceRecord(data, input)
  }
}
