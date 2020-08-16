import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getTodo from "app/todos/queries/getTodo"
import deleteTodo from "app/todos/mutations/deleteTodo"

export const Todo = () => {
  const router = useRouter()
  const todoId = useParam("todoId", "number")
  const [todo] = useQuery(getTodo, { where: { id: todoId } })

  return (
    <div>
      <Head>
        <title>Todo - {todo.text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Todo {todo.id}</h1>
      <pre>{JSON.stringify(todo, null, 2)}</pre>

      {
        <Link href="/todos/[todoId]/edit" as={`/todos/${todo.id}/edit`}>
          <a>Edit</a>
        </Link>
      }

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteTodo({ where: { id: todo.id } })
            router.push("/todos")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowTodoPage: BlitzPage = () => {
  return (
    <div>
      <main>
        <p>
          {
            <Link href="/todos">
              <a>Todos</a>
            </Link>
          }
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <Todo />
        </Suspense>
      </main>
    </div>
  )
}

export default ShowTodoPage
