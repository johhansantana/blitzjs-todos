import db, { TodoDeleteArgs } from "db"

type DeleteTodoInput = {
  where: TodoDeleteArgs["where"]
}

export default async function deleteTodo({ where }: DeleteTodoInput, ctx: Record<any, any> = {}) {
  const todo = await db.todo.delete({ where })

  return todo
}
