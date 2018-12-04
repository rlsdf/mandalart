import React from 'react'
import Todo from './Todo'

type Props = {
  mainIndex: number,
  list: any[]
}

const SubStep = (props: Props) => {
  const { mainIndex, list } = props

  return (
    <div className="subStep">
      {list.map((item, index) =>
        <Todo key={`${mainIndex}-${index}`} {...item} id={`${mainIndex}-${index}`}/>)}
    </div>
  )
}

export default SubStep
