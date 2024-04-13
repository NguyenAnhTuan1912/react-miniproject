// Import from hooks
import { ChangeStateFnType } from "src/hooks/useStateWESSFns";

export function getInitialState() {
  return {
    isAsyncTaskPerforming: false,
    isAsyncTaskPerformed: false
  }
}

export function buildStateFns(changeState: ChangeStateFnType<ReturnType<typeof getInitialState>>) {
  return {
    setIsAsyncTaskPerforming: function(data: boolean) {
      changeState("isAsyncTaskPerforming", function() {
        return data;
      })
    },

    setIsAsyncTaskPerformed: function(data: boolean) {
      changeState("isAsyncTaskPerformed", function() {
        return data;
      });
    }
  }
}