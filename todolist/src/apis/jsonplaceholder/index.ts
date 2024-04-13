import { UserAPI as _UserAPI_ } from "./user";
import { TaskAPI as _TaskAPI_ } from "./task";

export class JSONPlaceholder {
  static BASE = "https://jsonplaceholder.typicode.com";

  static UserAPI: _UserAPI_ = new _UserAPI_(JSONPlaceholder.BASE);
  static TaskAPI: _TaskAPI_ = new _TaskAPI_(JSONPlaceholder.BASE);
}