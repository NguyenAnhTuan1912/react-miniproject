import React from 'react';

// Import from hooks
import { useStateWESSFns } from "src/hooks/useStateWESSFns";

// Import locally
import { getInitialState, buildStateFns } from "./state";
import type { AppSelectProps, OptionProps, Option as OptionData } from "./types";

function prepareOptions(data: Array<OptionData>): [Array<OptionData>, (OptionData | null)] {
  const o = new Set(data);
  const result = [] as Array<OptionData>;
  let firstOption = null;

  for(const opt of o.values()) {
    if(!firstOption) firstOption = opt;
    result.push(opt);
  }

  return [result, firstOption];
}

/**
 * Use this functional component to render an `option` for `select` of app.
 * @param props 
 * @returns 
 */
function Option(props: OptionProps) {
  return (
    <button className="flex justify-start" onClick={() => props.onSelectOption()}>
      {
        props.data.label
      }
    </button>
  )
}

/**
 * Use this functional component to create new select for app. An alternative solution for `select`.
 * @returns 
 */
export default function AppSelect(props: AppSelectProps) {
  const [state, setStateFns] = useStateWESSFns(getInitialState(), buildStateFns);

  const [options, firstOption] = React.useMemo(() => {
    return prepareOptions(props.data);
  }, [props.data.length]);

  React.useEffect(() => {
    setStateFns.setSelectedOption(firstOption!);
  }, [props.data.length]);

  React.useEffect(() => {
    if(!state.selectedOption) return;
    props.onSelectOption(state.selectedOption);
  }, [state.selectedOption]);

  return (
    <div className="flex relative border-2 rounded cursor-pointer">
      <div
        onClick={() => setStateFns.toggleIsOpen()}
        className="flex justify-between w-full px-3 py-2 bg-white hover:bg-slate-50 select-none"
      >
        <h1>{state.selectedOption?.label}</h1>
        <span className="material-symbols-outlined font-bold">{state.isOpen ? "expand_less" : "expand_more"}</span>
      </div>
      {
        state.isOpen && (
          <div className="absolute flex flex-col border-2 mt-3 rounded w-full top-full overflow-auto max-h-80">
            {
              options.map(opt => (
                <Option
                  onSelectOption={() => {
                    setStateFns.setIsOpen(false);
                    setStateFns.setSelectedOption(opt);
                  }}
                  key={opt.value}
                  isSelected={state.selectedOption == opt}
                  data={opt}
                />
              ))
            }
          </div>
        )
      }
    </div>
  )
}