import db, { FindManyTodoArgs } from "db"

type GetTodosInput = {
  where?: FindManyTodoArgs["where"]
  orderBy?: FindManyTodoArgs["orderBy"]
  cursor?: FindManyTodoArgs["cursor"]
  take?: FindManyTodoArgs["take"]
  skip?: FindManyTodoArgs["skip"]
  // Only available if a model relationship exists
  // include?: FindManyTodoArgs['include']
}

export default async function getTodos(
  { where, orderBy, cursor, take, skip }: GetTodosInput,
  ctx: Record<any, any> = {}
) {
  const todos = await db.todo.findMany({
    where,
    orderBy,
    cursor,
    take,
    skip,
  })

  return todos
}
