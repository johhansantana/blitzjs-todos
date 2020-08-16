import React, { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage } from "blitz"
import getTodo from "app/todos/queries/getTodo"
import deleteTodo from "app/todos/mutations/deleteTodo"
import MainLayout from "../../../layouts/MainLayout"
import Title from "../../../components/Title"
import updateTodo from "../../mutations/updateTodo"
import TodoForm from "../../components/TodoForm"

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

      <TodoForm initialValues={todo} edit={false} />
    </div>
  )
}

const ShowTodoPage: BlitzPage = () => {
  return (
    <MainLayout>
      <main>
        <Title text="Todos App with Blitzjs" />

        <Suspense fallback={<div>Loading...</div>}>
          <Todo />
        </Suspense>
      </main>
    </MainLayout>
  )
}

export default ShowTodoPage
