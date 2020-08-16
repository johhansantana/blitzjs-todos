import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getTodo from "app/todos/queries/getTodo"
import updateTodo from "app/todos/mutations/updateTodo"
import TodoForm from "app/todos/components/TodoForm"
import MainLayout from "../../../../layouts/MainLayout"
import Title from "../../../../components/Title"

export const EditTodo = () => {
  const router = useRouter()
  const todoId = useParam("todoId", "number")
  const [todo, { mutate }] = useQuery(getTodo, { where: { id: todoId } })

  return (
    <div>
      <h1>Edit Todo {todo.text}</h1>

      <TodoForm
        initialValues={todo}
        onSubmit={async ({ text }) => {
          try {
            const updated = await updateTodo({
              where: { id: todo.id },
              data: { text },
            })
            await mutate(updated)
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
    <MainLayout>
      <Head>
        <title>Edit Todo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title text="Todos App with Blitzjs" />

        <Suspense fallback={<div>Loading...</div>}>
          <EditTodo />
        </Suspense>
      </main>
    </MainLayout>
  )
}

export default EditTodoPage
