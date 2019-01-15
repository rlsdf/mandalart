import React from 'react'
import { TodoType } from '../types'
import Todo from './Todo'

type Props = {
  mainIndex: number,
  list: TodoType[],
  onChangeTodo: Function
}

const SubStep = (props: Props) => {
  const { mainIndex, list, onChangeTodo } = props

  return (
    <div className="subStep">
      {list.map((item, index) => {
        const todoProps = {
          ...item,
          onChangeTodo,
          id: `${mainIndex}-${index}`
        }

        return <Todo key={`${mainIndex}-${index}`} {...todoProps} />
      })}
    </div>
  )
}

export default SubStep
