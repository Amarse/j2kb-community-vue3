import {
  DataSnapshot,
  Database,
  ThenableReference,
  child,
  equalTo,
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

  public queryEqualTo(
    refs: string,
    childKey: string
  ): Promise<DataSnapshot> {
    const rawObject = this.getRawObject();
    const dataRef = query(ref(rawObject, refs), equalTo(childKey)).ref;
    return get(dataRef);
  }

  public queryOrderBy(refs: string, orderBy: string): Promise<DataSnapshot> {
    const rawObject = this.getRawObject();
    const dataRef = query(ref(rawObject, refs), orderByChild(orderBy)).ref;
    return get(dataRef);
  }

  private getRawObject(): Database {
    return isProxy(this.database) ? toRaw(this.database) : this.database;
  }
}
