import { TodoType } from '../types'
import Direction from './enum'

const processMandalToObject = (list: TodoType[][]) => {
  const mandal = {
    goal: '',
    mainSteps: {}
  }

  list.forEach((main: [], i: number) => {
    main.forEach((sub: TodoType, j: number) => {
      const mainId = Direction[i]
      const subId = Direction[j]
      const todo = sub.todo

      if (todo) {
        if (mainId !== 'center' && !mandal.mainSteps[mainId]) {
          mandal.mainSteps[mainId] = {}
        }

        if (mainId === 'center' && subId === 'center') {

          mandal.goal = todo

        } else if (subId === 'center') {

          mandal.mainSteps[mainId] = {
            ...mandal.mainSteps[mainId],
            todo
          }

        } else if (mainId !== 'center' && subId !== 'center') {

          if (!mandal.mainSteps[mainId].subSteps) {
            mandal.mainSteps[mainId].subSteps = {}
          }

          mandal.mainSteps[mainId].subSteps[subId] = {
            todo
          }
        }
      }
    })
  })

  return mandal
}

export default processMandalToObject
