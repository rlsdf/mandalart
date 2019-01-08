import React from 'react'

type Props = {
  id: string,
  todo: string,
  onChangeTodo: Function
}

const Todo = (props: Props) => {
  const { id, todo, onChangeTodo } = props

  return (
    <div className="todo">
      {id}
      <input type="text" defaultValue={todo || ''} onChange={onChangeTodo(id)}/>
    </div>
  )
}

export default Todo
