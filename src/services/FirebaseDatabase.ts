import {
  DataSnapshot,
  Database,
  ThenableReference,
  child,
  get,
  getDatabase,
  orderByChild,
  push,
  query,
  ref,
  remove,
  set,
  update,
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

  public push(refs: string): ThenableReference {
    const rawObject = this.getRawObject();
    return push(child(ref(rawObject), refs));
  }

  public update(value: any): Promise<void> {
    const rawObject = this.getRawObject();
    return update(ref(rawObject), value);
  }

  public remove(refs: string): Promise<void> {
    const rawObject = this.getRawObject();
    return remove(ref(rawObject, refs));
  }

  public getSnapshotChild(
    refs: string,
    childKey: string
  ): Promise<DataSnapshot> {
    const rawObject = this.getRawObject();
    const dataRef = query(ref(rawObject, refs), orderByChild(childKey)).ref;
    return get(dataRef);
  }

  private getRawObject(): Database {
    return isProxy(this.database) ? toRaw(this.database) : this.database;
  }
}
