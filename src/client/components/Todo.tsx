import React from 'react'

type Props = {
  id: string,
  todo: string
}

const Todo = (props: Props) => {
  const { id, todo } = props

  return (
    <div className="todo">{id}: {todo}</div>
  )
}

export default Todo
