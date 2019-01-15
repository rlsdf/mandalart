import Direction from './enum'

/**
 * 오브젝트 형태를 이차원배열로
  {
    goal: '최종목표',
    mainSteps: {
      leftTop: {
        todo: '할일1',
        subSteps: {
          leftTop: { todo: '할일1-1' },
          left: { todo: '할일1-4' },
          rightBottom: { todo: '할일1-8' }
        }
      },
      rightTop: {
        todo: '할일3',
        subSteps: {
          top: { todo: '할일3-1' },
          right: { todo: '할일3-4' },
          bottom: { todo: '할일3-8' }
        }
      }
    }
  }
*/
const processMandalToArray = (state: any) => {
  const data: any = state.mandals[0]
  const goal: string = data.goal
  const mainList: object[] = new Array(9).fill({ todo: '' })
  const mainSteps: object = data.mainSteps
  const mainStepKeys: string[] = Object.keys(mainSteps) // ['leftTop', 'rightTop']
  const mainStepList: object[] = mainStepKeys.reduce((mains: object[], mainKey: string) => {
    const mainDirection: string = Direction[mainKey] // 0 -> 2
    const main: any = mainSteps[mainKey] // [{todo, subSteps}, empty, {todo, subSteps}]
    const mainTodo = main.todo

    const subSteps: object = main.subSteps
    const subStepKeys: string[] = Object.keys(subSteps)
    const subStepList: object[] = subStepKeys.reduce((subs: object[], subKey: string) => {
      const subDirection: string = Direction[subKey]

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

export default processMandalToArray
