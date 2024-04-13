import { UserAPI } from "./user";
import { TaskAPI } from "./task";

export class JSONPlaceholderAPI {
  static BASE = "https://jsonplaceholder.typicode.com";

  userAPI!: UserAPI;
  taskAPI!: TaskAPI;

  constructor() {
    this.userAPI = new UserAPI(JSONPlaceholderAPI.BASE);
    this.taskAPI = new TaskAPI(JSONPlaceholderAPI.BASE);
  }
}