import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestMandal, updateRequestMandal } from '../redux/actions'
import { StoreState } from '../redux/reducer'
import MainStep from '../components/MainStep'

type ListType = {
  todo: string
}

type Props = {
  list: ListType[][],
  requestMandal: Function,
  updateRequestMandal: Function
}
type State = {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  UNSAFE_componentWillMount() {
    const endpoint = 'http://localhost:9999/graphql'
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
    this.props.updateRequestMandal(params)
  }

  render() {
    return (
      <MainStep list={this.props.list} onChangeTodo={this.changeTodo} />
    )
  }
}

const mapStateToProps = ({ mandal }: StoreState) => ({
  list: mandal.list
})

export default connect(
  mapStateToProps,
  { requestMandal, updateRequestMandal }
)(App) as any
