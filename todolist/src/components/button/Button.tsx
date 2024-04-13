import React from "react";

// Import from hooks
import { useStateWESSFns } from "src/hooks/useStateWESSFns";

// Import from utils.
// import { OtherUtils } from 'src/utils/other';

// Import locally
import { getInitialState, buildStateFns } from "./state";
import type { ButtonProps } from "./types";

const defaultClassName = "rounded";

function buildClassName(
  className: string,
  color: string,
  hoverColor: string | undefined,
  activeColor: string | undefined,
  focusColor: string | undefined,
  extendClassName: string | undefined
) {
  if(color) className += " " + `bg-${color}`;
  else className += " " + "bg-white";
  if(hoverColor) className += " " + `hover:bg-${hoverColor}`;
  else className += " " + "hover:bg-slate-50";
  if(activeColor) className += " " + `active:bg-${activeColor}`;
  else className += " " + "active:bg-slate-200";
  if(focusColor) className += " " + `focus:ring-${focusColor}`;
  else className += " focus:ring-rose-600"
  className += " focus:outline-none focus:ring";

  if(extendClassName) className += " " + extendClassName;

  return className;
}

/**
 * Use this functional component to render a button.
 * @param props 
 * @returns 
 */
export default function Button<T>({
  color,
  hoverColor,
  activeColor,
  focusColor,
  extendClassName,
  asyncTask,
  children,
  ...props
}: ButtonProps<T>) {
  const [state, setStateFns] = useStateWESSFns(getInitialState(), buildStateFns);

  const className = buildClassName(
    defaultClassName,
    color,
    hoverColor,
    activeColor,
    focusColor,
    extendClassName
  );

  // React.useEffect(() => {
  //   if(state.isAsyncTaskPerformed && asyncTask) {
  //     asyncTask?.emitData();
  //   }
  // }, [state.isAsyncTaskPerformed]);

  if(state.isAsyncTaskPerforming) {
    return (
      <button
        {...props}
        disabled
        className={className}
      >
        <span className="material-symbols-outlined animate-spin">progress_activity</span>
      </button>
    )
  }

  if(asyncTask) {
    return (
      <button
        {...props}
        onClick={() => {
          setStateFns.setIsAsyncTaskPerforming(true);

          asyncTask
          .performAsyncTask()
          .then((data) => {
            setStateFns.setIsAsyncTaskPerforming(false);
            setStateFns.setIsAsyncTaskPerformed(true);
            asyncTask.emitData(data);
          })
        }}
        className={className}
      >
        { children }
      </button>
    )
  }

  return (
    <button
      {...props}
      className={className}
    >
      { children }
    </button>
  )
}