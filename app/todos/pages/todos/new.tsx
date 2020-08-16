import React from "react"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createTodo from "app/todos/mutations/createTodo"
import TodoForm from "app/todos/components/TodoForm"

const NewTodoPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>New Todo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Create New Todo </h1>

        <TodoForm
          onSubmit={async ({ text }) => {
            try {
              const todo = await createTodo({ data: { text } })
              alert("Success!" + JSON.stringify(todo))
              router.push("/todos/[todoId]", `/todos/${todo.id}`)
            } catch (error) {
              alert("Error creating todo " + JSON.stringify(error, null, 2))
            }
          }}
        />

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

export default NewTodoPage
