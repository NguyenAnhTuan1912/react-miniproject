import React from 'react';

// Import apis
import { JSONPlaceholder } from 'src/apis/jsonplaceholder';
import type { JSONPlaceholder_TaskData } from 'src/apis/jsonplaceholder/types';

// Import from hooks
import { useStateWESSFns } from "src/hooks/useStateWESSFns";

// Import from components
import AppSelect from "../app_select/AppSelect";
import Button from '../button/Button';

// Import locally
import { getInitialState, buildStateFns } from "./state";
import type { TaskProps } from './types';

/**
 * Use this functional component to render tasks of an user.
 * @param props 
 */
function Task(props: TaskProps) {
  return (
    <div className="flex items-center w-full px-3 py-2 border-b-2">
      {
        props.data.completed
          ? (<span className="material-symbols-outlined text-green-600">check_circle</span>)
          : (<span className="material-symbols-outlined text-yellow-600">do_not_disturb_on</span>)
      }
      <div className="flex justify-between items-center w-full ms-3">
        <p className="font-bold w-3/4 min-w-[250px]">{props.data.title}</p>
        {
          !props.data.completed && (
            <Button<JSONPlaceholder_TaskData>
              color="blue-500"
              focusColor="blue-300"
              hoverColor="blue-700"
              activeColor="blue-800"
              extendClassName="flex justify-center text-white px-3 py-2 w-1/4 min-w-[125px]"
              asyncTask={{
                emitData: function(data) {
                  props.emitData(data);
                },
                performAsyncTask: function() {
                  return JSONPlaceholder
                  .TaskAPI
                  .updateAsync(props.data.id, true)
                }
              }}
            >Mark as done</Button>
          )
        }
      </div>
    </div>
  )
}

/**
 * Use this functional component to render a to to list of an user. You can interact with
 * tasks.
 * @returns 
 */
export default function TodoList() {
  const [state, setStateFns] = useStateWESSFns(getInitialState(), buildStateFns);

  // Get users
  React.useEffect(() => {
    JSONPlaceholder
    .UserAPI
    .getMultiplyAsync()
    .then(users => {
      setStateFns.setUsers(users);
    })
  }, []);

  // Get user's task
  React.useEffect(() => {
    if(state.selectedUserId == "") return;

    // Update loading status
    setStateFns.setIsLoadingMoreTasks(true);

    JSONPlaceholder
    .TaskAPI
    .getMultiplyAsync(state.selectedUserId)
    .then(tasks => {
      // Sort tasks
      tasks = tasks.sort((a, b) => {
        return a.completed && !b.completed ? 1 : -1;
      });

      // Update loading status and new tasks
      setStateFns.setIsLoadingMoreTasks(false);
      setStateFns.setTasks(tasks);
    })

  }, [state.selectedUserId]);

  return (
    <div className="flex w-screen min-h-screen">
      <section className="m-auto p-5 w-screen max-w-[720px] min-w-[375px] rounded-lg shadow-md bg-gray-50">
        <header>
          <h1 className="font-semibold text-3xl text-blue-500 mb-3">To-do list</h1>
        </header>
        {/* User */}
        <section className="mb-3 pb-3 border-b">
          <h1 className="block font-semibold text-gray mb-2">User</h1>
          <AppSelect
            data={state.users ? state.users.map(user => ({ label: user.name, value: user.id })) : []}
            onSelectOption={option => {
              setStateFns.setSelectedUserId(option?.value);
            }}
          />
        </section>
        {/* Task */}
        <section>
          <h1 className="block font-semibold text-gray mb-2">Tasks</h1>
          <section className="flex flex-col max-h-[480px] px-3 py-2 mb-3 bg-white border-2 overflow-auto">
            {
              !state.isLoadingMoreTasks
              ? (
                  state.tasks
                    ? state.tasks.map(task => (
                      <Task
                        key={task.id}
                        data={task}
                        emitData={data => {
                          setStateFns.updateTask(data);
                        }}
                      />
                    ))
                    : null
                )
                : (
                  <p className="flex items-center font-semibold text-gray m-auto">
                    <span className="material-symbols-outlined animate-spin me-3">progress_activity</span>
                    Loading...
                  </p>
                )
            }
          </section>
        </section>
        {/* Number of complete tasks */}
        <section>
          <h1 className="block text-gray mb-2">
            <span className="font-semibold">Completed tasks: </span>
            <span>{state.tasks?.reduce((sum, task) => { if(task.completed) sum++; return sum; }, 0)} / {state.tasks?.length}</span>
          </h1>
        </section>
      </section>
    </div>
  )
}