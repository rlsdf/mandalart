import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { TodoType } from '../types'
import processMandalToObject from '../helper/processMandalToObject'
import {
  requestMandal,
  updateMandal,
  updateRequestMandal
} from '../redux/actions'
import { StoreState } from '../redux/reducer'
import MainStep from '../components/MainStep'

type Props = {
  list: TodoType[][],
  requestMandal: Function,
  updateMandal: Function,
  updateRequestMandal: Function
}

class App extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  UNSAFE_componentWillMount() {
    const endpoint = 'http://localhost:9099/graphql'
    const query = `{
      mandals {
        goal
        mainSteps
      }
    }`

    this.props.requestMandal({
      params: {
        method: 'post',
        url: endpoint,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ query })
      }
    })
  }

  changeTodo = (id: string) => (e) => {
    const params = {
      id,
      todo: e.target.value
    }
    this.props.updateMandal(params)
  }

  updateRequestMandal = (e: React.MouseEvent<HTMLElement>) => {
    const { list, updateRequestMandal } = this.props
    const newMandal = processMandalToObject(list)
    const endpoint = 'http://localhost:9099/graphql'
    const query = `
      mutation {
        updateMandal(
          id: "5c06a204daba1419f4b01f82",
          goal: "${newMandal.goal}",
          mainSteps: ${newMandal.mainSteps}
        ) {
          goal
          mainSteps
        }
      }
    `

    updateRequestMandal({
      params: {
        method: 'post',
        url: endpoint,
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ query })
      }
    })
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.updateRequestMandal}>수정</button>
        <button>삭제</button>
        <MainStep list={this.props.list} onChangeTodo={this.changeTodo} />
      </Fragment>
    )
  }
}

const mapStateToProps = ({ mandal }: StoreState) => ({
  list: mandal.list
})

export default connect(
  mapStateToProps,
  {
    requestMandal,
    updateMandal,
    updateRequestMandal
  }
)(App) as any
