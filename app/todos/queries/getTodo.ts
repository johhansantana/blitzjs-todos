import { NotFoundError } from "blitz"
import db, { FindOneTodoArgs } from "db"

type GetTodoInput = {
  where: FindOneTodoArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneTodoArgs['include']
}

export default async function getTodo(
  { where /* include */ }: GetTodoInput,
  ctx: Record<any, any> = {}
) {
  const todo = await db.todo.findOne({ where })

  if (!todo) throw new NotFoundError()

  return todo
}
