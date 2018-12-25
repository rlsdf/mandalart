import React from 'react'
import Todo from './Todo'

type ListType = {
  todo: string
}

type Props = {
  mainIndex: number,
  list: ListType[]
}

const SubStep = (props: Props) => {
  const { mainIndex, list } = props

  return (
    <div className="subStep">
      {list.map((item, index) =>
        <Todo key={`${mainIndex}-${index}`} id={`${mainIndex}-${index}`} {...item} />)}
    </div>
  )
}

export default SubStep
