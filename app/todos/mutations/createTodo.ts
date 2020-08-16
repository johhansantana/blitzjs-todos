import db, { TodoCreateArgs } from "db"

type CreateTodoInput = {
  data: TodoCreateArgs["data"]
}
export default async function createTodo({ data }: CreateTodoInput, ctx: Record<any, any> = {}) {
  const todo = await db.todo.create({ data })

  return todo
}
