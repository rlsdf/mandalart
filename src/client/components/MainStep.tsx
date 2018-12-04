import React from 'react'
import SubStep from './SubStep'

type Props = {
  list: any[]
}

const MainStep = (props: Props) => (
  <div className="mainStep">
    {props.list.map((item, index) => <SubStep key={index} list={item} mainIndex={index} />)}
  </div>
)

export default MainStep
