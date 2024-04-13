// Import from apis
import { JSONPlaceholder_TaskData } from "src/apis/jsonplaceholder/types";

export type TaskProps = {
  data: JSONPlaceholder_TaskData;
  emitData: (data: JSONPlaceholder_TaskData) => void;
};