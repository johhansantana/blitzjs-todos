import db, { TodoUpdateArgs } from "db"

type UpdateTodoInput = {
  where: TodoUpdateArgs["where"]
  data: TodoUpdateArgs["data"]
}

export default async function updateTodo(
  { where, data }: UpdateTodoInput,
  ctx: Record<any, any> = {}
) {
  const todo = await db.todo.update({ where, data })

  return todo
}
