import type { APIMethods } from "src/types/api";

// Import locally
import type { JSONPlaceholder_TaskData } from "./types";

/**
 * A class of Task (Todo) API Caller for `JSONPlaceholder`. Create an instance from this class
 * to request (an) user resourc(es) from `JSONPlaceholder`.
 */
export class TaskAPI implements APIMethods {
  base!: string;

  static PATHS = {
    todos: "/todos"
  };

  constructor(base: string) {
    this.base = base;
  }

  async getMultiplyAsync(userId: string | number): Promise<Array<JSONPlaceholder_TaskData>> {
    const response = await fetch(this.base + `/users/${userId}` + TaskAPI.PATHS.todos);
    const users = await response.json() as Array<JSONPlaceholder_TaskData>;
    return users;
  }

  async updateAsync(taskId: string | number, state: boolean): Promise<JSONPlaceholder_TaskData> {
    const response = await fetch(this.base + TaskAPI.PATHS.todos + `/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: state
      })
    });
    const result = await response.json();
    (result as JSONPlaceholder_TaskData).completed = state;
    return result;
  }
}