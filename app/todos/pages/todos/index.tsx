import React, { Suspense, useCallback } from "react"
import { Head, Link, useQuery, BlitzPage } from "blitz"
import getTodos from "app/todos/queries/getTodos"
import updateTodo from "../../mutations/updateTodo"
import MainLayout from "../../../layouts/MainLayout"
import Title from "../../../components/Title"
import Button from "../../../components/Button"

export const TodosList = () => {
  const [todos, { mutate, refetch }] = useQuery(getTodos, {
    orderBy: { id: "desc" },
  })

  return (
    <>
      <h4 className="font-bold mt-2">Todos</h4>
      <ul>
        {todos
          .filter((todo) => todo.completed === false)
          .map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                className="mr-1"
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
                <a className="underline text-blue-700">{todo.text}</a>
              </Link>
            </li>
          ))}
      </ul>

      <h4 className="font-bold mt-2">Completed Todos</h4>
      <ul>
        {todos
          .filter((todo) => todo.completed === true)
          .map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                className="mr-1"
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
                <a className="underline text-blue-700">{todo.text}</a>
              </Link>
            </li>
          ))}
      </ul>
    </>
  )
}

const TodosPage: BlitzPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title text="Todos App with Blitzjs" />

        <div className="mb-2">
          {
            <Link href="/todos/new">
              <a>
                <Button text="Create Todo" />
              </a>
            </Link>
          }
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <TodosList />
        </Suspense>
      </main>
    </MainLayout>
  )
}

export default TodosPage
