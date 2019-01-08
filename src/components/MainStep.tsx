import React from 'react'
import SubStep from './SubStep'

type ListType = {
  todo: string
}

type Props = {
  list: ListType[][],
  onChangeTodo: Function
}

const MainStep = (props: Props) => (
  <div className="mainStep">
    {props.list.map((item, index) =>
      <SubStep key={index} list={item} mainIndex={index} onChangeTodo={props.onChangeTodo} />)}
  </div>
)

export default MainStep
