import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getTodo from "app/todos/queries/getTodo"
import updateTodo from "app/todos/mutations/updateTodo"
import TodoForm from "app/todos/components/TodoForm"

export const EditTodo = () => {
  const router = useRouter()
  const todoId = useParam("todoId", "number")
  const [todo, { mutate }] = useQuery(getTodo, { where: { id: todoId } })

  return (
    <div>
      <h1>Edit Todo {todo.id}</h1>
      <pre>{JSON.stringify(todo)}</pre>

      <TodoForm
        initialValues={todo}
        onSubmit={async ({ text }) => {
          try {
            const updated = await updateTodo({
              where: { id: todo.id },
              data: { text },
            })
            mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/todos/[todoId]", `/todos/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating todo " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditTodoPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Edit Todo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditTodo />
        </Suspense>

        <p>
          {
            <Link href="/todos">
              <a>Todos</a>
            </Link>
          }
        </p>
      </main>
    </div>
  )
}

export default EditTodoPage
