import React, { useRef } from "react"
import { Todo } from "db"

type TodoFormProps = {
  initialValues?: Todo
  onSubmit: ({ text }: { text: string }) => any
}

const TodoForm = ({ initialValues, onSubmit }: TodoFormProps) => {
  let todoInputRef = useRef(initialValues?.text || "")
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit({ text: todoInputRef.current })
      }}
    >
      <div>Put your form fields here. But for now, just click submit</div>
      <input
        type="text"
        defaultValue={todoInputRef.current}
        onChange={(e) => {
          todoInputRef.current = e.target.value
        }}
      />
      <button>Submit</button>
    </form>
  )
}

export default TodoForm
