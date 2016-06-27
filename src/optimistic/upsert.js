import { replaceRecord } from './replace';
import { storeRecord } from './store';

export function upsertRecord(data, input) {
  if (data.find(({ id }) => id === input.id)) {
    return replaceRecord(data, input);
  } else {
    return storeRecord(data, input);
  }
}

export function upsertAllRecords(data, input) {
  if (Array.isArray(input)) {
    return input.reduce(upsertRecord, data);
  } else {
    return upsertRecord(data, input);
  }
}
