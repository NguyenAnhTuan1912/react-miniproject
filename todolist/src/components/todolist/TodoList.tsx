// Import from hooks
import { useAPI } from "src/hooks/useAPI"

// Import from components
import AppSelect from "../app_select/AppSelect"

const options = [
  {
    label: "Hello", value: 1
  },
  {
    label: "World", value: 2
  }
]

/**
 * Use this functional component to render a to to list of an user. You can interact with
 * tasks.
 * @returns 
 */
export default function TodoList() {
  return (
    <div className="flex w-screen min-h-screen">
      <section className="m-auto p-5 w-screen max-w-[720px] min-w-[375px] rounded-lg shadow-md bg-gray-50">
        <header>
          <h1 className="font-semibold text-3xl text-blue-500 mb-3">To-do list</h1>
        </header>
        {/* User */}
        <section className="mb-3 pb-3 border-b">
          <h1 className="block font-semibold text-gray mb-2">User</h1>
          <AppSelect data={options} onSelectOption={console.log} />
        </section>
        {/* Task */}
        <section>
          <h1 className="block font-semibold text-gray mb-2">Tasks</h1>
          <section className="px-3 py-2 bg-white border-2">

          </section>
        </section>
      </section>
    </div>
  )
}