export type HttpMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export interface APIMethods {
  // GET
  getAsync?(...args: Array<unknown | undefined>): Promise<unknown>;
  getMultiplyAsync?(...args: Array<unknown | undefined>): Promise<unknown>;

  // POST
  createAsync?(...args: Array<unknown | undefined>): Promise<unknown>;

  // PUT
  updateAsync?(...args: Array<unknown | undefined>): Promise<unknown>;

  // DELETE
  deleteAsync?(...args: Array<unknown | undefined>): Promise<unknown>;
}