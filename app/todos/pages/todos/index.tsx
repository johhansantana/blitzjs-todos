import React, { Suspense, useCallback } from "react"
import { Head, Link, useQuery, BlitzPage } from "blitz"
import getTodos from "app/todos/queries/getTodos"
import updateTodo from "../../mutations/updateTodo"

export const TodosList = () => {
  const [todos, { mutate, refetch }] = useQuery(getTodos, {
    orderBy: { id: "desc" },
  })

  return (
    <>
      <h4>Todos</h4>
      <ul>
        {todos
          .filter((todo) => todo.completed === false)
          .map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={async (e) => {
                  try {
                    await updateTodo({
                      where: {
                        id: todo.id,
                      },
                      data: {
                        completed: true,
                      },
                    })
                    refetch()
                  } catch (err) {
                    console.error(err)
                  }
                }}
              />
              <Link href="/todos/[todoId]" as={`/todos/${todo.id}`}>
                <a>{todo.text}</a>
              </Link>
            </li>
          ))}
      </ul>

      <h4>Completed Todos</h4>
      <ul>
        {todos
          .filter((todo) => todo.completed === true)
          .map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={async (e) => {
                  try {
                    await updateTodo({
                      where: {
                        id: todo.id,
                      },
                      data: {
                        completed: false,
                      },
                    })
                    refetch()
                  } catch (err) {
                    console.error(err)
                  }
                }}
              />
              <Link href="/todos/[todoId]" as={`/todos/${todo.id}`}>
                <a>{todo.text}</a>
              </Link>
            </li>
          ))}
      </ul>
    </>
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
