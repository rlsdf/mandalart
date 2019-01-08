import React from 'react'
import Todo from './Todo'

type ListType = {
  todo: string
}

type Props = {
  mainIndex: number,
  list: ListType[],
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
