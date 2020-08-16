import React, { Suspense, useCallback } from "react"
import { Head, Link, useQuery, BlitzPage } from "blitz"
import getTodos from "app/todos/queries/getTodos"

export const TodosList = () => {
  const [todos, { mutate }] = useQuery(getTodos, { orderBy: { id: "desc" } })

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <Link href="/todos/[todoId]" as={`/todos/${todo.id}`}>
            <a>{todo.text}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

const TodosPage: BlitzPage = () => {
  return (
    <div>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Todos</h1>

        <p>
          {
            <Link href="/todos/new">
              <a>Create Todo</a>
            </Link>
          }
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TodosList />
        </Suspense>
      </main>
    </div>
  )
}

export default TodosPage
