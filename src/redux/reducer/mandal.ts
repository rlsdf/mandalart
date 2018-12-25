import { handleActions } from 'redux-actions'
import { MANDAL_SUCCESS } from '../actionTypes'

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

export interface MandalState {
  origin: object,
  list: object[]
}

const initialState: MandalState = {
  origin: {},
  list: []
}

const processMandalData = (state: any) => {
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

const successMandal = (state: MandalState, action: any) => {
  const list = processMandalData(action.payload)

  /**
   * payload로 넘겨받은 데이터를 이차원배열로
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

  return {
    ...state,
    list
  }
}

const mandal = handleActions<MandalState>({
  [MANDAL_SUCCESS]: successMandal
}, initialState)

export default mandal
