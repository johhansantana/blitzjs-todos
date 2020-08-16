import React from "react"
import { Head, Link, useRouter, BlitzPage } from "blitz"
import createTodo from "app/todos/mutations/createTodo"
import TodoForm from "app/todos/components/TodoForm"
import MainLayout from "../../../layouts/MainLayout"
import Title from "../../../components/Title"

const NewTodoPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <MainLayout>
      <Head>
        <title>New Todo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title text="Create New Todo" />

        <TodoForm
          onSubmit={async ({ text }) => {
            try {
              await createTodo({ data: { text } })
              router.push("/todos")
            } catch (error) {
              alert("Error creating todo " + JSON.stringify(error, null, 2))
            }
          }}
        />
      </main>
    </MainLayout>
  )
}

export default NewTodoPage
