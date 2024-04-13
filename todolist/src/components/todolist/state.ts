// Import from apis
import type { JSONPlaceholder_TaskData } from "src/apis/jsonplaceholder/types";
import type { JSONPlaceholder_UserData } from "src/apis/jsonplaceholder/types";

// Import from hooks
import { ChangeStateFnType } from "src/hooks/useStateWESSFns";

export function getInitialState() {
  return {
    selectedUserId: "",
    isLoadingMoreTasks: false,
    tasks: null as Array<JSONPlaceholder_TaskData> | null,
    users: null as Array<JSONPlaceholder_UserData> | null
  }
}

export function buildStateFns(changeState: ChangeStateFnType<ReturnType<typeof getInitialState>>) {
  return {
    setTasks: function(data: Array<JSONPlaceholder_TaskData> | null) {
      changeState("tasks", function() {
        return data;
      })
    },

    updateTask: function(data: JSONPlaceholder_TaskData) {
      changeState("tasks", function(prevState) {
        if(!prevState) return prevState;
        const index = prevState.findIndex(task => task.id === data.id);
        // Remove
        prevState.splice(index, 1);
        return [...prevState, data];
      })
    },

    setUsers: function(data: Array<JSONPlaceholder_UserData>| null) {
      changeState("users", function() {
        return data;
      });
    },

    setSelectedUserId: function(data: string | number | undefined) {
      changeState("selectedUserId", function() {
        if(!data) return "";
        return data.toString();
      });
    },

    setIsLoadingMoreTasks: function(data: boolean) {
      changeState("isLoadingMoreTasks", function() {
        return data;
      });
    }
  }
}