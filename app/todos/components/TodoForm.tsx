import React, { useMemo, useRef } from "react"
import { Link, useParam, useRouter } from "blitz"
import { Todo } from "db"
import Button from "../../components/Button"
import deleteTodo from "../mutations/deleteTodo"

type TodoFormProps = {
  initialValues?: Todo
  onSubmit?: ({ text }: { text: string }) => any
  edit?: boolean
}

const TodoForm = ({ initialValues, onSubmit, edit }: TodoFormProps) => {
  const router = useRouter()
  const todoId = useParam("todoId", "number")
  let todoInputRef = useRef(initialValues?.text || "")
  const renderedButton = useMemo(() => {
    if (edit === true) {
      return (
        <>
          <div className="mr-2 inline">
            <Button type="submit" text="Submit" />
          </div>
          <Link href="/todos">
            <a>
              <Button buttonType="secondary" type="button" text="Cancel" />
            </a>
          </Link>
        </>
      )
    } else {
      return (
        <>
          <Link href="/todos/[todoId]/edit" as={`/todos/${todoId}/edit`}>
            <a className="mr-2 inline">
              <Button type="button" text="Edit" />
            </a>
          </Link>
          <div className="mr-2 inline">
            <Button
              onClick={async () => {
                if (window.confirm("This will be deleted")) {
                  await deleteTodo({ where: { id: todoId } })
                  router.push("/todos")
                }
              }}
              buttonType="danger"
              type="button"
              text="Delete"
            />
          </div>
        </>
      )
    }
  }, [edit, router, todoId])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.({ text: todoInputRef.current })
      }}
    >
      <input
        disabled={edit === false}
        type="text"
        className="mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="todo"
        defaultValue={todoInputRef.current}
        onChange={(e) => {
          todoInputRef.current = e.target.value
        }}
      />
      {renderedButton}
    </form>
  )
}

TodoForm.defaultProps = {
  edit: true,
}

export default TodoForm
