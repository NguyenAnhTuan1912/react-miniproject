// Import from apis
import type { JSONPlaceholder_TaskData } from "src/apis/jsonplaceholder/types";

// Import from hooks
import { ChangeStateFnType } from "src/hooks/useStateWESSFns";

export function getInitialState() {
  return {
    tasks: null as Array<JSONPlaceholder_TaskData> | null
  }
}

export function buildStateFns(changeState: ChangeStateFnType<ReturnType<typeof getInitialState>>) {
  return {
    setTasks: function(data: Array<JSONPlaceholder_TaskData>) {
      changeState("tasks", function() {
        return data;
      })
    }
  }
}