import { Database, getDatabase, ref, set } from "firebase/database";
import { isProxy, toRaw } from "vue";

export default class FirebaseDatabase {
  private database: Database;
  constructor() {
    this.database = getDatabase();
  }
  public write(refs: string, data: any): Promise<void> {
    this.database = isProxy(this.database)
      ? toRaw(this.database)
      : this.database;
    const rawObject = toRaw(this.database);
    const dataRef = ref(rawObject, refs);
    return set(dataRef, data);
  }
}
