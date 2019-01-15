import React from 'react'
import { TodoType } from '../types'
import SubStep from './SubStep'

type Props = {
  list: TodoType[][],
  onChangeTodo: Function
}

const MainStep = (props: Props) => (
  <div className="mainStep">
    {props.list.map((item, index) =>
      <SubStep key={index} list={item} mainIndex={index} onChangeTodo={props.onChangeTodo} />)}
  </div>
)

export default MainStep
