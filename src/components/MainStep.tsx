import React from 'react'
import SubStep from './SubStep'

type ListType = {
  todo: string
}

type Props = {
  list: ListType[][]
}

const MainStep = (props: Props) => (
  <div className="mainStep">
    {props.list.map((item, index) => <SubStep key={index} list={item} mainIndex={index} />)}
  </div>
)

export default MainStep
