import { removeRecord, removeAllRecords } from './remove';
import { replaceAllRecords } from './replace';
import { storeAllRecords } from './store';
import { upsertAllRecords } from './upsert';

export default function performUpdate(data, op, input) {
  switch (op) {
    case 'remove':
      return removeRecord(data, input);
    case 'removeAll':
      return removeAllRecords(data, input);
    case 'replace':
      return replaceAllRecords(data, input);
    case 'store':
      return storeAllRecords(data, input);
    case 'upsert':
      return upsertAllRecords(data, input);
    default:
      return data;
  }
}
