import {
  DataSnapshot,
  Database,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
  set,
} from "firebase/database";
import { isProxy, toRaw } from "vue";

export default class FirebaseDatabase {
  private database: Database;
  constructor() {
    this.database = getDatabase();
  }

  public write(refs: string, data: any): Promise<void> {
    const rawObject = this.getRawObject();
    const dataRef = ref(rawObject, refs);
    return set(dataRef, data);
  }

  public getSnapshotChild(refs: string, childKey: string): Promise<DataSnapshot> {
    const rawObject = this.getRawObject();
    const dataRef = query(ref(rawObject, refs), orderByChild(childKey)).ref;
    return get(dataRef);
  }

  private getRawObject(): Database {
    return isProxy(this.database) ? toRaw(this.database) : this.database;
  }
}
