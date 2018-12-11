import React, { Component, Fragment } from 'react'
import MainStep from '../client/components/MainStep'
// import './style.css'

type Props = {
  data: String
}
type State = {}

enum Direction {
  leftTop, // 0
  top, // 1
  rightTop, // 2
  left, // 3
  center, // 4
  right, // 5
  leftBottom, // 6
  bottom, // 7
  rightBottom // 8
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const data: any = props.data
    const mandal = JSON.parse(data).mandals[0]

    this.state = { mandal }

    // {
    //   goal: '최종목표',
    //   mainSteps: {
    //     leftTop: {
    //       todo: '할일1',
    //       subSteps: {
    //         leftTop: { todo: '할일1-1' },
    //         left: { todo: '할일1-4' },
    //         rightBottom: { todo: '할일1-8' }
    //       }
    //     },
    //     rightTop: {
    //       todo: '할일3',
    //       subSteps: {
    //         top: { todo: '할일3-1' },
    //         right: { todo: '할일3-4' },
    //         bottom: { todo: '할일3-8' }
    //       }
    //     }
    //   }
    // }
  }

  processMandalData() {
    const state: any = this.state
    const data: any = state.mandal
    const goal: string = data.goal
    const mainList: any[] = new Array(9).fill({ todo: '' })
    const mainSteps: any = data.mainSteps
    const mainStepKeys: string[] = Object.keys(mainSteps) // ['leftTop', 'rightTop']
    const mainStepList: any[] = mainStepKeys.reduce((mains: any[], mainKey: any) => {
      const mainDirection: any = Direction[mainKey] // 0 -> 2
      const main: any = mainSteps[mainKey] // [{todo, subSteps}, empty, {todo, subSteps}]
      const mainTodo = main.todo

      const subSteps: any = main.subSteps
      const subStepKeys: string[] = Object.keys(subSteps)
      const subStepList: any[] = subStepKeys.reduce((subs: any[], subKey: any) => {
        const subDirection: any = Direction[subKey]

        subs[subDirection] = subSteps[subKey]

        return subs
      }, new Array(9).fill({ todo: '' }))

      subStepList[Direction.center] = { todo: mainTodo }
      mainList[mainDirection] = { todo: mainTodo }
      mains[mainDirection] = subStepList // [{todo, list}, empty, {todo, list}]

      return mains
    }, new Array(9).fill(new Array(9).fill({ todo: '' })))

    mainList[Direction.center] = { todo: goal }
    mainStepList[Direction.center] = mainList

    return mainStepList
  }

  render() {
    const mandals = this.processMandalData()

    return (
      <Fragment>
        <div>Hello, SSR</div>
        <MainStep list={mandals} />
      </Fragment>
    )
  }
}

export default App
