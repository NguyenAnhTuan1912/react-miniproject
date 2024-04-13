// Import from hooks
import { ChangeStateFnType } from "src/hooks/useStateWESSFns";

// Import locally
import type { Option } from "./AppSelect.props";

export function getInitialState() {
  return {
    selectedOption: null as Option | null,
    isOpen: false
  }
}

export function buildStateFns(changeState: ChangeStateFnType<ReturnType<typeof getInitialState>>) {
  return {
    setSelectedOption: function(data: Option) {
      changeState("selectedOption", function() {
        return data;
      })
    },

    toggleIsOpen: function() {
      changeState("isOpen", function(prevState) { return !prevState; });
    },

    setIsOpen: function(data: boolean) {
      changeState("isOpen", function() { return data; });
    }
  }
}