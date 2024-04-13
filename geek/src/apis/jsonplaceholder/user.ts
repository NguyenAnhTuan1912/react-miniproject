import type { APIMethods } from "src/types/api";

// Import locally
import type { JSONPlaceholder_UserData } from "./types";

/**
 * A class of User API Caller for `JSONPlaceholder`. Create an instance from this class
 * to request (an) user resourc(es) from `JSONPlaceholder`.
 */
export class UserAPI implements APIMethods {
  base!: string;

  static PATHS = {
    users: "/users"
  };

  constructor(base: string) {
    this.base = base;
  }

  async getMultiplyAsync(): Promise<Array<JSONPlaceholder_UserData>> {
    const response = await fetch(this.base + UserAPI.PATHS.users);
    const users = await response.json() as Array<JSONPlaceholder_UserData>;
    return users;
  }
}